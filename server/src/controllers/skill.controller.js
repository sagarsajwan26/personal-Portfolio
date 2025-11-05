import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { logger } from "../utils/logger.js";
import {} from "../utils/validator.js";
import { Skill } from "../models/skill.models.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

export const addSkill = asyncHandler(async (req, res) => {
  console.log(req.body);
  
  const {
    name,
    category,
    categoryColor,
    proficiencyLevel,
    yearsOfExperience,
    description,
    skillColor,
    isActive,
  } = req.body;

  if (!name || !category || !description) {
    throw new ApiError(400, "All fields are required");
  }
  const image = req.file;

  const uploadImage = await uploadToCloudinary(image.buffer);

  if (!uploadImage) {
    throw new ApiError(400, "Error while uploading image");
  }
  let skill = await Skill.create({
    name,
    category,
    categoryColor,
    proficiencyLevel,
    yearsOfExperience,
    description,
    skillColor,
    isActive,
    public_id:uploadImage.public_id,
    skillIcon: uploadImage.secure_url,
    createdBy: req.user._id,
  });
  if (!skill) {
    throw new ApiError(400, "Error while creating skill");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Skill created successfully", skill));
});
export const updateSkill = asyncHandler(async (req, res) => {
  console.log(req.body);
  
  const {id,public_id} = req.params
  const {
    name,
    category,
    categoryColor,
    proficiencyLevel,
    yearsOfExperience,
    description,
    skillColor,
    isActive,
  } = req.body;
  let updateData = {...req.body};


  const image = req.file;
  let uploadImage;
  if (image) {
  
    uploadImage = await uploadToCloudinary(image.buffer);
    await deleteFromCloudinary(public_id)
  }

  if (uploadImage) updateData.skillIcon = uploadImage.secure_url   ;

  const skill = await Skill.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    {
      $set: updateData,
    },
    { new: true }
  );

  if (!skill) throw new ApiError(404, "provided skill id is not valid");
  return res
    .status(200)
    .json(new ApiResponse(200, "skills has  been updated successfully", skill));
});

export const deleteSkill = asyncHandler(async (req, res) => {


  await deleteFromCloudinary(req.params.public_id)
  const skill = await Skill.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user._id,
  });
  if (!skill) throw new ApiError(404, "skill not found");
  return res
    .status(200)
    .json(new ApiResponse(200, "skill has been deleted successfully", skill));
});

export const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.aggregate([
    {
      $group: {
        _id: "$category",
        data: { $push: "$$ROOT" },
      },
    },
    {
        $project:{
            _id:0,
            category:"$_id",
            data:1
        }
    },
    {
        $sort:{
            category:1
        }
    }
   
  ]);

  return res.status(200).json(new ApiResponse(200, "skills fetched", skills));
});

export const getSkillById= asyncHandler(async(req,res)=>{
  const skill= await Skill.findById(req.params.id).lean()
  
  if(!skill) throw new ApiError(404, "skill not found")
    return res.status(200).json(new ApiResponse(200, "skill fetched", skill))

})