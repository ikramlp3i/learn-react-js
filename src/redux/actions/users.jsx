import { createAction } from "@reduxjs/toolkit";

// API Process
export const getUsers = createAction("GET_USERS");
export const findUser = createAction("FIND_USER");
export const createUser = createAction("CREATE_USER");
export const updateUser = createAction("UPDATE_USER");
export const deleteUser = createAction("DELETE_USER");

// Variables
export const titleUser = createAction("TITLE_USER");
export const formDIalogUser = createAction("FORM_DIALOG_USER");