import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const loginAdmin= createAsyncThunk('/admin/login',async(data,{rejectWithValue})=>{
    try {
        const res= await axiosInstance.post('/auth/login',data) 
      
        return res.data.data
        
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const logoutAdmin= createAsyncThunk('/admin/logout',async(data,{rejectWithValue})=>{
    try {
        const res= await axiosInstance.get('/auth/logout') 
      return res.data.data
        
    } catch (error) {
        return rejectWithValue(error.data)
    }
})