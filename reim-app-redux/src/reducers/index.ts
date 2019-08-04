import { combineReducers } from "redux";
import User from "../models/user";
import authReducer from "./auth.reducer";


export interface IAuthState {
    currentUser?: User,
    errorMessage?: string
}

// compose IState of all the other pieces of the state store
export interface IState {
    auth: IAuthState
}

export const state = combineReducers<IState>({
    auth: authReducer
})