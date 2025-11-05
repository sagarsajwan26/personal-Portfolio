
import { createSlice } from "@reduxjs/toolkit"
import { getDashboardDetails } from "./dashboardThunk"

const initialState={
    dashboard:{}
}


const dashboard= createSlice({
    name:'dashboard',
    initialState,
    reducers:{
       
    },
    extraReducers:(builder)=>{
        builder.addCase(getDashboardDetails.fulfilled,(state,action)=>{
            state.dashboard=action.payload
        })
    }
   
})


export const { } = dashboard.actions

export default dashboard.reducer
