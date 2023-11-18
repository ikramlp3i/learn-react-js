import { createAction } from "@reduxjs/toolkit";

// API Process
export const getProducts = createAction("GET_PRODUCTS");
export const findProduct = createAction("FIND_PRODUCT");
export const createProduct = createAction("CREATE_PRODUCT");
export const updateProduct = createAction("UPDATE_PRODUCT");
export const deleteProduct = createAction("DELETE_PRODUCT");

// Variables
export const titleProduct = createAction("TITLE_PRODUCT");
export const formDIalogProduct = createAction("FORM_DIALOG_PRODUCT");