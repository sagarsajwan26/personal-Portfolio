import { createAsyncThunk } from "@reduxjs/toolkit";
import {API_ROUTES} from '../../utils/apiRoutes'
import axiosInstance from "../../utils/axiosInstance";
export const getDashboardDetails= createAsyncThunk('/user/dashboard',async(data,{rejectWithValue})=>{
        const token = localStorage.getItem('token')
    
    try {
            const response= await axiosInstance.get(`${API_ROUTES.DASHBOARD.GET_DETAILS}`,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
                
            })
           
            
            return response.data.data
        } catch (error) {
          
            
            return rejectWithValue(error.response.data)
        }
})