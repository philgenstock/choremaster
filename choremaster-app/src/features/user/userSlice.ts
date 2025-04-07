import {createAppSlice} from "../../app/createAppSlice";
import axios from 'axios';
import  type {AxiosResponse} from 'axios';
import type {PayloadAction} from "@reduxjs/toolkit";
import type {AppDispatch, AppThunk} from "../../app/store";
import {baseUrl} from "../../app/baseUrl";
import {saveTokenInLocalStorage} from "./authUtils";

export interface UserSliceState {
    token: string | null
    displayName: string | null
    status: "idle" | "loading" | "failed"
}

export interface UserProfile {
    token: string,
    displayName: string,
}

const initialState: UserSliceState = {
    token: null,
    displayName: null,
    status: "idle"
}

export const userSlice = createAppSlice({
    name: "user",
    initialState,
    reducers: create => ({
        setUser: create.reducer(
            (state, action: PayloadAction<UserProfile>) => {
                saveTokenInLocalStorage(action.payload.token)
                state.token = action.payload.token
                state.displayName = action.payload.displayName

            },
        )
    }),
    selectors: {
        selectDisplayName: user => user.displayName,
        selectStatus: user => user.status,
        selectIsLoggedIn: user => !!user.token,
    },
})

const {setUser} =
    userSlice.actions

export const { selectDisplayName,selectIsLoggedIn } = userSlice.selectors

export function initializeUser(token: string, dispatch: AppDispatch){
    axios.post<any, AxiosResponse<UserProfile>>(`${baseUrl}/user/login?token=${token}`, {
    }).then(result => {
        dispatch(setUser(result.data))
    })
}