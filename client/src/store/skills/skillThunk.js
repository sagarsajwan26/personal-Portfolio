import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import {API_ROUTES} from '../../utils/apiRoutes'

export const fetchSkills= createAsyncThunk('/user/skill',async(_,{rejectWithValue})=>{
        try {
            const res= await axiosInstance.get(API_ROUTES.SKILL.GET_ALL)
            return res.data.data
        } catch (error) {
            return rejectWithValue(error.response.data)

        }
})

export const getSingleSkill = createAsyncThunk('/user/skill/:id',async(id, {rejectWithValue})=>{
    try {
        const res= await axiosInstance.get(API_ROUTES.SKILL.GET_BY_ID(id))
        
        
        
        return res.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)

    }
})


export const updateSkillData = createAsyncThunk('/user/skill/:id',async({skillId, public_id, form}, {rejectWithValue})=>{
    try {
      
        
        const res= await axiosInstance.put(API_ROUTES.SKILL.UPDATE(skillId,public_id), form)
        return res.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)

    }
})


export const deleteSkillData= createAsyncThunk('skills/get',async({id, public_id},{rejectWithValue})=>{
    try {

        const res= await axiosInstance.delete(API_ROUTES.SKILL.DELETE(id,public_id))
        return res.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const addSkill= createAsyncThunk('/user/skill/add',async(data, {rejectWithValue})=>{
    try {
        const res= await axiosInstance.post(API_ROUTES.SKILL.ADD, data)
        return res.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)

    }
})