
import { createSlice } from "@reduxjs/toolkit"
import { addSkill, deleteSkillData, fetchSkills, getSingleSkill } from "./skillThunk"

const initialState={
    skills:null,
    singleSkill:null
}


const skillSlice= createSlice({
    name:'skill',
    initialState,
    reducers:{
       
    },
   extraReducers:(builder)=>{
    builder.addCase(fetchSkills.fulfilled,(state,action)=>{
        // console.log(action.payload);
        
        state.skills=action.payload
    })
    builder.addCase(getSingleSkill.fulfilled,(state,action)=>{
        state.singleSkill= action.payload
    
        
    })

   builder.addCase(deleteSkillData.fulfilled, (state, action) => {
  const categoryIndex = state.skills.findIndex(item => item.category === action.payload.category);
  
  if (categoryIndex !== -1) {
    const updatedData = state.skills[categoryIndex].data.filter(skill => skill._id !== action.payload._id);

    state.skills[categoryIndex] = {
      ...state.skills[categoryIndex],
      data: updatedData
    };
  }
});


builder.addCase(addSkill.fulfilled, (state, action) => {

console.log(action.payload);
console.log(JSON.parse(JSON.stringify(state.skills)));

    const categoryIndex= state.skills.findIndex(item=>item.category===action.payload.category)
   
    
    if(categoryIndex!==-1){
      const updateData= state.skills[categoryIndex].data.push(action.payload)
    }else{
      state.skills.push(action.payload)
    }
 
  })



   }
})


export const { } = skillSlice.actions

export default skillSlice.reducer
