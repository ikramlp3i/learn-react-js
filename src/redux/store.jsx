import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from './reducers/users'
import thunk from "redux-thunk";
import productsReducer from "./reducers/products";

const reducers = combineReducers({
    users: usersReducer,
    products: productsReducer
});

const store = configureStore({
    reducer: reducers,
    middleware: [thunk]
})

export default store