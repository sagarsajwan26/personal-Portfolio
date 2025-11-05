import axiosInstance from './axiosInstance'

export const API_ROUTES = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout'
  },

  USER: {
    GET_DATA: '/user',
    UPDATE_DATA: '/user/updateData',
    UPDATE_PROFILE_PIC: '/user/updateProfilePic',
    ADD_WORK_EXPERIENCE: '/user/addUserWorkExperience',
    UPDATE_WORK_EXPERIENCE: (id) => `/user/updateUserWorkExperience/${id}`,
    UPDATE_CONTACT_INFO: '/user/updateUserContactInfo',
    UPDATE_USER_SOCIAL_INFO:`/user/updateUserSocialLinkData`,
    DELETE_USER_EXPERIENCE: (id) => `/user/deleteUserExperience/${id}`
  },

  PROJECT: {
    ADD: '/project',
    GET_BY_ID: (id) => `/project/${id}`,
    UPDATE_STRING_DATA: (id) => `/project/editObjectdata/${id}`,
    UPDATE_ARRAY_DATA: (id) => `/project/updateprojectArrayData/${id}`,
    UPDATE_IMAGE: (projectId, imageId) => `/project/updateProjectImage/${projectId}/${imageId}`,
    DELETE_IMAGE: (projectId, imageId, publicId) => `/project/deleteProjectImage/${projectId}/${imageId}/${publicId}`,
    ADD_SCREENSHOT: (projectId) => `/project/addScreenshot/${projectId}`,
    DELETE: (projectId) => `/project/deleteProject/${projectId}`,
    GET_PROJECT_FOR_USER:()=>`/project/getProjectsForuser`,
    GET_PROJECT_FOR_ADMIN:(limit,skip)=>`/project/getProjects?limit=${limit}&skip=${skip}`,
  },

 
  SKILL: {
    GET_ALL: '/skill',
    ADD: '/skill/add',
    UPDATE:  (skillId, imageId) => `/skill/${skillId}/${imageId}`,
    DELETE: (id,public_id) => `/skill/${id}/${public_id}`,
    GET_BY_ID: (id) => `/skill/${id}`
  },


  PORTFOLIO: {
    ADD: '/portfolio',
    GET: '/portfolio'
  },


  CONTACT: {
    SUBMIT: '/contact'
  },

  
  DASHBOARD: {
    GET_DETAILS: '/dashboard'
  }
}


export const apiService = {

  register: (data) => axiosInstance.post(API_ROUTES.AUTH.REGISTER, data),
  login: (data) => axiosInstance.post(API_ROUTES.AUTH.LOGIN, data),
  logout: () => axiosInstance.get(API_ROUTES.AUTH.LOGOUT),

  // User
  getUserData: () => axiosInstance.get(API_ROUTES.USER.GET_DATA),
  updateUserData: (data) => axiosInstance.put(API_ROUTES.USER.UPDATE_DATA, data),
  updateProfilePic: (formData) => axiosInstance.post(API_ROUTES.USER.UPDATE_PROFILE_PIC, formData),
  addWorkExperience: (data) => axiosInstance.post(API_ROUTES.USER.ADD_WORK_EXPERIENCE, data),
  updateWorkExperience: (id, data) => axiosInstance.put(API_ROUTES.USER.UPDATE_WORK_EXPERIENCE(id), data),
  updateContactInfo: (data) => axiosInstance.put(API_ROUTES.USER.UPDATE_CONTACT_INFO, data),
  updateUserSocialLinksInfo:(data)=> axiosInstance.put(API_ROUTES.USER.UPDATE_USER_SOCIAL_INFO,data),
  deleteUserExperience:(id)=> axiosInstance.delete(API_ROUTES.USER.DELETE_USER_EXPERIENCE(id)),
  
  // Project
  addProject: (formData) => axiosInstance.post(API_ROUTES.PROJECT.ADD, formData),
  getProjectById: (id) => axiosInstance.get(API_ROUTES.PROJECT.GET_BY_ID(id)),
  updateProjectStringData: (id, data) => axiosInstance.put(API_ROUTES.PROJECT.UPDATE_STRING_DATA(id), data),
  updateProjectArrayData: (id, data) => axiosInstance.put(API_ROUTES.PROJECT.UPDATE_ARRAY_DATA(id), data),
  updateProjectImage: (projectId, imageId, formData) => axiosInstance.put(API_ROUTES.PROJECT.UPDATE_IMAGE(projectId, imageId), formData),
  deleteProjectImage: (projectId, imageId, publicId) => axiosInstance.delete(API_ROUTES.PROJECT.DELETE_IMAGE(projectId, imageId, publicId)),
  addScreenshot: (projectId, formData) => axiosInstance.post(API_ROUTES.PROJECT.ADD_SCREENSHOT(projectId), formData),
  deleteProject: (projectId) => axiosInstance.delete(API_ROUTES.PROJECT.DELETE(projectId)),
  getProjectsForUser:()=> axiosInstance.get(API_ROUTES.PROJECT.GET_PROJECT_FOR_USER) ,
  getProjectsForAdmin:(limit,skip)=> axiosInstance.get(API_ROUTES.PROJECT.GET_PROJECT_FOR_ADMIN(limit,skip)) ,

  // Skills
  getSkills: () => axiosInstance.get(API_ROUTES.SKILL.GET_ALL),
  addSkill: (formData) => axiosInstance.post(API_ROUTES.SKILL.ADD, formData),
  updateSkill: (id, formData) => axiosInstance.put(API_ROUTES.SKILL.UPDATE(id), formData),
  deleteSkill: (id) => axiosInstance.delete(API_ROUTES.SKILL.DELETE(id)),

  // Portfolio
  addPortfolio: (formData) => axiosInstance.post(API_ROUTES.PORTFOLIO.ADD, formData),
  getPortfolio: () => axiosInstance.get(API_ROUTES.PORTFOLIO.GET),

  // Contact
  submitContact: (data) => axiosInstance.post(API_ROUTES.CONTACT.SUBMIT, data),

  // Dashboard
  getDashboardDetails: () => axiosInstance.get(API_ROUTES.DASHBOARD.GET_DETAILS)
}

// Usage Examples:
// import { apiService } from '../utils/apiRoutes'
// 
// const handleLogin = async (credentials) => {
//   try {
//     const response = await apiService.login(credentials)
//     console.log(response.data)
//   } catch (error) {
//     console.error(error.response.data)
//   }
// }
//
// const getProject = async (id) => {
//   const response = await apiService.getProjectById(id)
//   return response.data
// }