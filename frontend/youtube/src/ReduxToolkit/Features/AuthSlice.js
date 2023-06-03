import { createSlice } from "@reduxjs/toolkit";

export const authSlice=createSlice({
    name:"auth",
    initialState:true,
    reducers:{
        enable:(state)=>({
            state:true,
        }),
        disable:(state)=>({
            state:false,
        })
    }
})

export default authSlice.reducer;
export const {enable,disable} = authSlice.actions;