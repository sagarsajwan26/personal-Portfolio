import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { logger } from "../utils/logger.js";
import { addProjectValidator } from "../utils/validator.js";
import { Project } from "../models/project.model.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../utils/cloudinary.js";

export const addProject = asyncHandler(async (req, res) => {
  const { error } = addProjectValidator(req.body);
 
  
  if (error)
    throw new ApiError(
      400,
      "fields are missing validation error",
      error.message
    );

  const {
    projectTitle,
    description,
    technologies,
    features,
    repositoryUrl,
    liveDemoUrl,
    role,
    teamSize,
    duration,
    challenges,
    lessonsLearned,
    isActive,
    captions,
  } = req.body;

  const images = req.files;

  let imageData = [];

  images.forEach((file) => {
    if (file.fieldname.startsWith("image")) {
      const index = file.fieldname.split("_")[1];

      const caption = captions[index];
      imageData.push({
        file,
        caption,
      });
    }
  });

  const uploadedImages = await Promise.all(
    imageData.map(async (item) => {
      const img = await uploadToCloudinary(item.file.buffer);

      return {
        url: img.secure_url,
        caption: item.caption,
        public_id: img.public_id,
      };
    })
  );

  if (
    !uploadedImages ||
    uploadedImages.length === 0 ||
    uploadedImages[0] === "undefined"
  )
    throw new ApiError(500, "image uploaded faied");

  const project = await Project.create({
    projectTitle,
    description,
    technologies,
    features,
    repositoryUrl,
    liveDemoUrl,
    role,
    teamSize,
    duration,
    challenges,
    lessonsLearned,
    isActive,
    createdBy: req.user._id,
    screenshots: uploadedImages,
  });

  return res.status(200).json(new ApiResponse(200, "project added", project));
});

export const updateProjectStringData = asyncHandler(async (req, res) => {
 

  const {
    projectTitle,
    description,
    liveDemoUrl,
    role,
    teamSize,
    duration,
    isActive,
  } = req.body;
  console.log(req.body);
  
  let updateData = { ...req.body };
  // if(projectTitle) updateData.projectTitle= projectTitle
  // if(description) updateData.description= description
  // if(liveDemoUrl) updateData.liveDemoUrl= liveDemoUrl
  // if(role) updateData.role= role
  // if(teamSize) updateData.teamSize= teamSize
  // if(duration) updateData.duration= duration
  // if(isActive) updateData.isActive= isActive
  // if(isActive===false) updateData.isActive= isActive
  if (req.body.isActive === "false") updateData.isActive = false;

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    {
      $set: updateData,
    },
    { new: true }
  );

  if (!updatedProject) throw new ApiError(500, "update failed");
  return res
    .status(200)
    .json(new ApiResponse(200, "project data updated", updatedProject));
});

export const updateprojectArrayData = asyncHandler(async (req, res) => {
  const { technologies, features, challenges, lessonsLearned } = req.body;
  let updateData = {};

  if (technologies) updateData.technologies = technologies.split(",");
  if (features) updateData.features = features.split(",");
  if (challenges) updateData.challenges = challenges.split(",");
  if (lessonsLearned) updateData.lessonsLearned = lessonsLearned.split(",");



  const project = await Project.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    {
      $set: updateData,
    },
    { new: true }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, "project data updated", project));
});

export const updateProjectImages = asyncHandler(async (req, res) => {
  const { projectId, imageId } = req.params;

  const fileImage = req.file;
  


  
  const { caption, public_id, image } = req.body;

  if (!fileImage && !image) throw new ApiError(400, "image is required");
  const project = await Project.findById(projectId);
  if (!project) throw new ApiError(400, "project not found");
  const imageIndex = project.screenshots.findIndex(
    (img) => img._id.toString() === imageId
  );
  if (imageIndex === -1) throw new ApiError(400, "image not found");

  let uploadImage;
  if (fileImage) {
    const deleteData = await deleteFromCloudinary(public_id);
    uploadImage = await uploadToCloudinary(fileImage.buffer);
    if (!uploadImage) throw new ApiError(500, "image upload failed");
  }

  const updateImage = await Project.findOneAndUpdate(
    { _id: projectId, "screenshots._id": imageId },
    {
      $set: {
        "screenshots.$.url": uploadImage?.secure_url || image,
        "screenshots.$.caption": caption,
        "screenshots.$.public_id": uploadImage?.public_id || public_id,
      },
    },
    { new: true }
  );

  if (!updateImage) throw new ApiError(500, "image update failed");
  return res
    .status(200)
    .json(new ApiResponse(200, "image updated", updateImage));
});

export const deleteProjectImage = asyncHandler(async (req, res) => {
  const { projectId, imageId, public_id } = req.params;

  if (!projectId || !imageId || !public_id)
    throw new ApiError(400, "id is missing");
  const project = await Project.findById(projectId);
  if (!project) throw new ApiError(404, "invalid Project");

  const screenshotslength= project.screenshots.length
  if(screenshotslength <=1)  throw new ApiError(400, "project must have at least one image");
  const imageIndex = project.screenshots.findIndex(
    (id) => id._id.toString() == imageId
  );
  if (imageIndex === -1) throw new ApiError(404, "image is invalid");

  if (!public_id) throw new ApiError(404, "invlid image id");
  const deleteImage = await deleteFromCloudinary(public_id);
  if (!deleteImage) throw new ApiError(400, "image deletion failed");
  const screenshotDelete = await Project.findOneAndUpdate(
    { _id: projectId, "screenshots._id": imageId },
    {
      $pull: {
        screenshots: {
          _id: imageId,
        },
      },
    },
    { new: true }
  );

  if (!screenshotDelete)
    throw new ApiError(
      500,
      "unable to delete screenshot please try after some time"
    );

  return res
    .status(200)
    .json(new ApiResponse(200, "image deleted Successfully", screenshotDelete));
});

export const addScreenShot = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { caption } = req.body;
  const image = req.file;

  if (!image) throw new ApiError(400, "image file is required");
  if (!projectId) throw new ApiError(400, "project id is missing");

  const uploadImage = await uploadToCloudinary(image.buffer);
  if (!uploadImage) throw new ApiError(400, "image uploading failed ");
  let data = {
    url: uploadImage?.secure_url,
    public_id: uploadImage?.public_id,
    caption,
  };

  const addedScreenshot = await Project.findByIdAndUpdate(
    projectId,
    {
      $push: {
        screenshots: data,
      },
    },
    {
      new: true,
    }
  );
  if (!addedScreenshot) throw new ApiError(404, "project not found");
  return res
    .status(200)
    .json(new ApiResponse(200, "screenshot added", addedScreenshot));
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  if (!project) throw new ApiError(404, "no project found");
  const publicIds = project.screenshots.map((item) => item.public_id);

  if (publicIds.length > 0) {
    const deleteResults = await Promise.all(
      publicIds.map((public_id) =>
        deleteFromCloudinary(public_id).catch((err) => ({
          error: err,
          public_id,
        }))
      )
    );

    const failedDeletes = deleteResults.filter(
      (result) => result && result.error
    );

    if (failedDeletes.length > 0) {
      return res.status(500).json(
        new ApiError(500, "Failed to delete some images from Cloudinary", {
          failedImages: failedDeletes.map((f) => f.public_id),
        })
      );
    }
  }

  const projectDeleted = await Project.findByIdAndDelete(projectId);

  if (!projectDeleted) throw new ApiError(404, "no project found");
  return res
    .status(200)
    .json(new ApiResponse(200, "project deleted", projectDeleted));
});
export const getProjects = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10
  const skip = parseInt(req.query.skip) || 0
  
  const projects = await Project.find({createdBy: req.user._id})
    .limit(limit)
    .skip(skip)
    .sort({createdAt: -1})
    .lean()
  
  return res
    .status(200)
    .json(new ApiResponse(200, "projects fetched", projects || []));
});

export const getProjectsForuser = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10
  const skip = parseInt(req.query.skip) || 0
  
  const projects = await Project.find({ isActive: true })
    .limit(limit)
    .skip(skip)
    .sort({createdAt: -1})
    .lean()

  return res
    .status(200)
    .json(new ApiResponse(200, "projects fetched", projects || []));
});

export const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "project id is missing");

  const project = await Project.findById(id);

  if (!project)
    return res.status(200).json(new ApiError(200, "product not found"));
  return res.status(200).json(new ApiResponse(200, "product fetched", project));
});
