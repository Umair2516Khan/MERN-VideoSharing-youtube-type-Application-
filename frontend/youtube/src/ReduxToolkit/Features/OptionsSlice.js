import { createSlice } from '@reduxjs/toolkit';
import { useRef } from 'react';


export const OptionSlice=createSlice({
    name: "option",
    initialState:{
        titleClicked:false,
        title:"",
        value:"home",
        channelClicked:false,
        channelID:"",
        subscribtionClicked:false,
    },
    reducers:{
        liked:(state)=>({
            state:{value:"liked",channelID:"",channelClicked:false,subscribtionClicked:false,titleClicked:false,title:""},
        }),
        sports:(state)=>({
            state:{value:"sports",channelID:"",channelClicked:false,subscribtionClicked:false,titleClicked:false,title:""},
        }),
        gaming:(state)=>({
            state:{value:"gaming",channelID:"",channelClicked:false,subscribtionClicked:false,titleClicked:false,title:""},
        }),
        home:(state)=>({
            state:{value:"home",channelID:"",channelClicked:false,subscribtionClicked:false,titleClicked:false,title:""},
        }),
        technology:(state)=>({
            state:{value:"technology",channelID:"",channelClicked:false,subscribtionClicked:false,titleClicked:false,title:""},
        }),
        top:(state)=>({
            state:{value:"top",channelID:"",channelClicked:false,subscribtionClicked:false,titleClicked:false,title:""},
        }),
        education:(state)=>({
            state:{value:"education",channelID:"",channelClicked:false,subscribtionClicked:false,titleClicked:false,title:""},
        }),
        yourVideos:(state)=>({
            state:{channelClicked:false,channelID:"",value:"yourVideos",subscribtionClicked:false,titleClicked:false,title:""}
        }),
        channelClicked:(state,action)=>({
            state:{channelClicked:true,channelID:action.payload,value:"",subscribtionClicked:false,titleClicked:false,title:""}
        }),
        subscribtionClicked:(state)=>({
            state:{channelClicked:false,channelID:"",value:"",subscribtionClicked:true,titleClicked:false,title:""}
        }),
        TitleSearch:(state,action)=>({
            state:{channelClicked:false,channelID:"",value:"",subscribtionClicked:false,titleClicked:true,title:action.payload}
        })
    }
})

export default OptionSlice.reducer;
export const {liked,gaming,top,education,yourVideos,technology,home,sports,channelClicked,subscribtionClicked,TitleSearch} = OptionSlice.actions;