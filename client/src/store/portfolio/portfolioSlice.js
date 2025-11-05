
import { createSlice } from "@reduxjs/toolkit"
import { getPortfolioDetails } from "./portfolioThunk"

const initialState={
    data:{}
}


const portfolioSlice= createSlice({
    name:'portfolio',
    initialState,
    reducers:{
       
    },
    extraReducers:(builder)=>{
        builder.addCase(getPortfolioDetails.fulfilled,(state,action)=>{
            state.data= action.payload
        })
        
    }
   
})


export const { } = portfolioSlice.actions

export default portfolioSlice.reducer
