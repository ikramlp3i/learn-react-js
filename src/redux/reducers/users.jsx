
import { getUsers, findUser, createUser, updateUser, deleteUser, titleUser, formDIalogUser } from "../actions/users";

const initialState = {
  users: [],
  user: null,
  title: null,
  form_dialog: false
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case getUsers.type:
      return {
        ...state,
        users: action.payload
      };
    case findUser.type:
      return {
        ...state,
        user: action.payload
      };
    case createUser.type:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case updateUser.type:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          } else {
            return user;
          }
        })
      };
    case deleteUser.type:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id)
      };
    case titleUser.type:
      return {
        ...state,
        title: action.payload
      }
    case formDIalogUser.type:
      return {
        ...state,
        form_dialog: action.payload
      }
    default:
      return state;
  }
};

export default usersReducer; 