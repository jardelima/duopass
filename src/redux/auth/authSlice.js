import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        auth: [
            {
                userLogged: false,
                userToken: "",
                userName: "",
                userPhoto: "",
            },
        ],
    },
    reducers: {
        getAuthRedux(state, {payload}) {
            return {...state, auth: payload};
        },
    },
});

export const {getAuthRedux} = authSlice.actions;

export const selectAuth = state => state.auth;

export default authSlice.reducer;
