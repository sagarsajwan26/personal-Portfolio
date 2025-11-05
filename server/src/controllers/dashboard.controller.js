import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import {User} from '../models/user.model.js'
import { Project } from "../models/project.model.js";
import {Contact} from '../models/contact.model.js'
import {Portfolio} from '../models/portfolio.model.js'
import { Skill } from "../models/skill.models.js";

export const adminDashboardDetails= asyncHandler(async(req,res)=>{
    
    
    const projects= await Project.aggregate([
     {
        $facet:{
            total:[
                {$count:"count"}
            ],
            active:[
                { $match:{ isActive:true}, },
                {$count:"count"}
            ],
            inActive:[
                {$match:{isActive:false}},
                {$count:"count"}
            ],
            RecentProjects:[
                {$sort:{createdAt:-1}},
                {$limit:2},
               
            ]
        }
     }
       
    ])


    const contacts= await Contact.aggregate([
        {
            $facet:{
                total:[
                    {$count:'count'}
                ],
                unRead:[
                {    $match:{isRead:false}},
                {$count:"count"}
                ],
               
            }
        }
    ])


    const skills= await Skill.aggregate([{
        $facet:{
            total:[
                {$count:'count'}
            ],
            grouped:[
                {
                    $group:{
                        _id:"$category",
                        skills:{
                            $push:"$$ROOT"
                        }

                    }
                }
            ],
            recentSkills:[
                {
                    $sort:{createdAt:-1}
                },
                {$limit:2},
               
            ]
        }
    }])

    const projectDetail= {
        total:projects[0].total[0] ?  projects[0].total[0].count : 0,
        active:projects[0].active[0] ?  projects[0].active[0].count : 0,
        inActive:projects[0].inActive[0] ?  projects[0].inActive[0].count : 0,
        recentProjects:projects[0].RecentProjects ? projects[0].RecentProjects : []
    }

    const skillsDetail= {
        total:skills[0].total[0]? skills[0].total[0].count: 0,
        grouped:skills[0].grouped.length? skills[0].grouped: [],
        recentSkills:skills[0].recentSkills ?skills[0].recentSkills   :[]
    }

    const contactDetails= {
        totalMessage:contacts[0].total[0] ? contacts[0].total[0].count :0,
        unRead: contacts[0].unRead.length ? contacts[0].unRead.length :0
    }

    

    return res.status(200).json(
        new ApiResponse(200, "Porjects fetched successfully", {projectDetail,skillsDetail,contactDetails})
    )
})