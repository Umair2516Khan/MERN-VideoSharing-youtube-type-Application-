import { configureStore } from "@reduxjs/toolkit";
import optionsReducer from '../ReduxToolkit/Features/OptionsSlice';
import authReducers from '../ReduxToolkit/Features/AuthSlice';
import TitleReducers from '../ReduxToolkit/Features/TitleSlice';
import CreateVideoReducers from '../ReduxToolkit/Features/CreateVideoSlice';

const Store=configureStore({
    reducer:{
        option:optionsReducer,
        auth:authReducers,
        title:TitleReducers,
        createVideo:CreateVideoReducers,
    }
})

export default Store;