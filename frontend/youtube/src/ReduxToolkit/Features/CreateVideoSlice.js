import { createSlice } from "@reduxjs/toolkit";

export const CreateVideoSlice=createSlice({
    name:"createVideo",
    initialState:false,
    reducers:{
        enableUpload:(state)=>({
            state:true,
        }),
        disableUpload:(state)=>({
            state:false,
        })
    }
})

export default CreateVideoSlice.reducer;
export const {enableUpload,disableUpload}=CreateVideoSlice.actions;