import {createAppSlice} from "../../app/createAppSlice";
import axios, {AxiosResponse} from 'axios';
import {PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";

export interface UserSliceState {
    token: string | null
    profile: any | null
    status: "idle" | "loading" | "failed"
}

export interface UserProfile {
    email: string,
    family_name: string,
    given_name: string,
    name: string
}

const initialState: UserSliceState = {
    token: null,
    profile: null,
    status: "idle"
}

export const userSlice = createAppSlice({
    name: "user",
    initialState,
    reducers: create => ({
        setToken: create.reducer(
            (state, action: PayloadAction<string>) => {
                state.token += action.payload
            },
        ),
        fetchProfile: create.asyncThunk(
            async (token: string) => {
                const response = await requestProfileFromGoogle(token)
                return response.data
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.status = "idle"
                    state.profile = action.payload
                },
                rejected: state => {
                    state.status = "failed"
                },
            },
        ),
    }),
    selectors: {
        selectProfile: user => user.profile,
        selectStatus: user => user.status,
    },
})

const {setToken, fetchProfile} =
    userSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectProfile, selectStatus } = userSlice.selectors

export const setTokenAndFetchProfile =
    (token: string): AppThunk =>
        (dispatch) => {
            dispatch(setToken(token))
            dispatch(fetchProfile(token))
        }


function requestProfileFromGoogle(token: string): Promise<AxiosResponse<UserProfile>>{
    return axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`, {
    })
}