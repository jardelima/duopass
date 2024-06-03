import {createSlice} from "@reduxjs/toolkit";

export const newPasswordSlice = createSlice({
    name: "new-password",
    initialState: {
        newPassword: "",
    },
    reducers: {
        getNewPasswordRedux(state, {payload}) {
            return {...state, newPassword: payload};
        },
    },
});

export const {getNewPasswordRedux} = newPasswordSlice.actions;

export const selectNewPassword = state => state.newPassword;

export default newPasswordSlice.reducer;
