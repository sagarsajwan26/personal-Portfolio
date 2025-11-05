
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../utils/apiRoutes";

export const FetchAllProjectsForAdmin= createAsyncThunk('admin/getProjects',async({limit,skip},{rejectWithValue})=>{
    try {
        
        
        const res= await apiService.getProjectsForAdmin(limit,skip)
       
       
        
        return res.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const fetchProjectById= createAsyncThunk('/admin/project/id',async(id,{rejectWithValue})=>{
    try {
        const res= await apiService.getProjectById(id)
        return res.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const AddProject= createAsyncThunk('admin/addProject',async(form,{rejectWithValue})=>{
    try {
        console.log(form);
        
        const res= await apiService.addProject(form)
        return res.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const handleProjectActive= createAsyncThunk('/admin/project/toggle',async({id, data}, {rejectWithValue})=>{
    try {
        const res= await apiService.updateProjectStringData(id , {...data}) 
       
        
        return res.data.data
    } catch (error) {
    return rejectWithValue(error.response.data)        
    }


})


export const handleStringProjectData= createAsyncThunk('/admin/project/string',async(data, {rejectWithValue})=>{
    
    try {
        
    
        const res= await apiService.updateProjectStringData(data.projectId,{...data} )
        
        
        return res.data.data
    } catch (error) {
    return rejectWithValue(error.response.data)
    }


})

export const handleProjectArrayData= createAsyncThunk('/admin/project/arrayData',async(data,{rejectWithValue})=>{
    try {
        console.log(data);
        
        const res= await apiService.updateProjectArrayData(data.projectId,{...data})
        return res.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const updateProjectImage = createAsyncThunk('/admin/update/updateProjectImage',async(data,{rejectWithValue})=>{
    try {
        
        
        
        const res= await apiService.updateProjectImage(data.projectId ,data.ImageId, data.form)
        return res.data.data
        
    } catch (error) {
        return rejectWithValue(error.response.data)
       }
})


export const deleteProjecImage= createAsyncThunk('/admin/project/image/delete',async({projectId, imageId, publicId},{rejectWithValue})=>{
    try {
        const res= await apiService.deleteProjectImage(projectId, imageId, publicId)
        return res.data.data
        
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const addScreenShot = createAsyncThunk('/admin/project/addScreenShot',async({projectId, form}, {rejectWithValue})=>{
    try {
        const res= await apiService.addScreenshot(projectId, form)
        return res.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const deleteProject= createAsyncThunk('/admin/project/delete',async(projectId,{rejectWithValue})=>{
   try {
    const res= await apiService.deleteProject(projectId)
    return res.data.data
   } catch (error) {
        return rejectWithValue(error.response.data)
    }
})