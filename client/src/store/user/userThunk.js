import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../utils/apiRoutes";


export const getuserDetails= createAsyncThunk('/user/getuser',async(_,{rejectWithValue})=>{
 
    try {
        const res= await apiService.getUserData()
    
        return res.data.data
        
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const updateUserDetails= createAsyncThunk('/user/updateuser',async(data, {rejectWithValue})=>{

    try {
        const res= await apiService.updateUserData(data)
           
            
        return res.data.data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const udpateUserWorkExperience= createAsyncThunk('/user/updateExperience', async({id, data},{rejectWithValue})=>{
    try {
            const res= await apiService.updateWorkExperience(id, data)
            return res.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const addUserWorkExperience= createAsyncThunk('/user/addExperience', async(data, {rejectWithValue})=>{
    try {
        console.log(data);
        
            const res= await apiService.addWorkExperience(data)
            return res.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const updateUserContactInfo= createAsyncThunk('/user/updateContactInfo', async(data, {rejectWithValue})=>{
    try {
            const res= await apiService.updateContactInfo(data)
            return res.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const updateUserSocialInfo= createAsyncThunk('/user/updateSocialInfo', async(data, {rejectWithValue})=>{
    try {

            const res= await apiService.updateUserSocialLinksInfo(data)
            console.log(res.data.data);
            
            
            return res.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const deleteUserWorkExperience= createAsyncThunk('/user/deleteExperience', async(id, {rejectWithValue})=>{
    try {
            const res= await apiService.deleteUserExperience(id)
            return res.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})