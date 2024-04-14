import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import UserModel from "../Models/UserModel";

// reducer for register
function register(currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    const registeredUser = action.payload
    const newState = registeredUser
    return newState
}

// reducer for login
function login(currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    const loggedIN = action.payload
    const newState = loggedIN
    return newState
}

// reducer for logout
function logout(currentState: UserModel, action: PayloadAction): UserModel {
    return null
}

// create the vacation slice:
const authSlice = createSlice({
    name: "auth",
    initialState: null,
    reducers: { register, login, logout }
})

export const authActionCreators = authSlice.actions

export const authReducersContainer = authSlice.reducer

