
import { createSlice } from "@reduxjs/toolkit"
import { loginAdmin, logoutAdmin } from "./authThunk"

const initialState={
    isAuthenticated:false,
    token:'',
 
}


const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginUser:(state,action)=>{

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginAdmin.fulfilled,(state,action)=>{
            console.log(action.payload);
            
            state.isAuthenticated=true
            state.token=action.payload.token
            localStorage.setItem('token',action.payload.token)
            
        })
        builder.addCase(logoutAdmin.fulfilled,(state,action)=>{
            state.isAuthenticated=false
            state.token=''
            localStorage.removeItem('token')
          
           
        })
    }
   
})


export const {loginUser } = authSlice.actions

export default authSlice.reducer
