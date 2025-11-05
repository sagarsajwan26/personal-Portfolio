
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../utils/apiRoutes";
export const getPortfolioDetails= createAsyncThunk('/user/portfolio', async(_Draggable,{rejectWithValue})=>{
    try {
        const res= await apiService.getPortfolio()
        console.log(res.data.data);
        
        return res.data.data
        
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})