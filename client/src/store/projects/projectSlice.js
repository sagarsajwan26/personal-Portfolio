import { createSlice } from "@reduxjs/toolkit"
import { AddProject, deleteProjecImage, deleteProject, FetchAllProjectsForAdmin, fetchProjectById, handleProjectActive, handleProjectArrayData, handleStringProjectData } from "./projectThunk"

const initialState={
    userProjects:null,
    adminProjects:null,
    singleProject:null
}

const projectSlice= createSlice({
    name:"project",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(FetchAllProjectsForAdmin.fulfilled,(state,action)=>{
          
            
            state.adminProjects=action.payload
        })

        builder.addCase(AddProject.fulfilled,(state,action)=>{
            state?.adminProjects?.push(action.payload)
            
        })
        builder.addCase(fetchProjectById.fulfilled, (state,action)=>{
            state.singleProject= action.payload
        })
            builder.addCase(handleStringProjectData.fulfilled,(state,action)=>{
                state.singleProject= {...action.payload}
            })

            builder.addCase(handleProjectArrayData.fulfilled,(state,action)=>{
                const index= state.adminProjects.findIndex(id=> id._id=== action.payload._id)
                console.log(action.payload);
                console.log(JSON.parse(JSON.stringify(state.adminProjects)));
                
                
                if(index) {
                    state.adminProjects[index]= action.payload
                }
            })
            builder.addCase(deleteProjecImage.fulfilled,(state,action)=>{
                
                const index= state.adminProjects.findIndex(id=> id._id=== action.payload._id)
                console.log(index);

                if(index!==-1){
                    state.adminProjects[index]= action.payload
                }
            })

            builder.addCase(deleteProject.fulfilled , (state,action)=>{
                const index= state.adminProjects.findIndex(id=> id._id=== action.payload._id) 
                console.log(index);
                
                // if(index!==-1){
                //     state.adminProjects.filter(id=> id._id!== action.payload._id)
                // }
            })

         

    }
    
})


export const {} = projectSlice.actions
export default projectSlice.reducer

