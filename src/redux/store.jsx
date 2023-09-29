import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from './reducers/users'
import thunk from "redux-thunk";

const reducers = combineReducers({
    users: usersReducer
});

const store = configureStore({
    reducer: reducers,
    middleware: [thunk]
})

export default store