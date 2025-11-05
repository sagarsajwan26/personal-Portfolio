import Joi from 'joi'
export const registerUserValidator= (data)=>{
const schema= Joi.object({
    
        firstName:Joi.string().required() ,
        lastName:Joi.string().optional(),
    
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    username:Joi.string().required()
})
return schema.validate(data)

}


export const loginUserValidator= (data)=>{
    const schema= Joi.object({
        username:Joi.string().required(),
        password:Joi.string().required()
    })
    return schema.validate(data)
}





export const addProjectValidator= (data)=>{
    const schema= Joi.object({
        projectTitle:Joi.string().required(),
        description:Joi.string().required(),
       
        technologies:Joi.array().items(Joi.string()).required(),
        features:Joi.array().items(Joi.string()),
        repositoryUrl:Joi.string().uri().required(),
        liveDemoUrl:Joi.string().uri().optional(),
        role:Joi.string().optional(),
        teamSize:Joi.number().required(),
        duration:Joi.string().required(),
        challenges:Joi.array().items(Joi.string()),
        lessonsLearned:Joi.array().items(Joi.string()),
        isActive:Joi.boolean().optional(),
        caption:Joi.array().items(Joi.string())
        
      

    }).unknown(true)
    return schema.validate(data)
}

