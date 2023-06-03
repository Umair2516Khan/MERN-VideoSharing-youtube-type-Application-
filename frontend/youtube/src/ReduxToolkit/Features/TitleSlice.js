import { createSlice } from "@reduxjs/toolkit"
export const TitleSlice=createSlice({
    name:"title",
    initialState:"",
    reducers:{
        titleSearched:(state,action)=>({
            state:action.payload
        })
    }
});

export default TitleSlice.reducer;
export const {titleSearched}=TitleSlice.actions;