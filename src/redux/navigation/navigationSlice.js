import {createSlice} from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
    name: "navigation",
    initialState: {
        navigation: "Home",
    },
    reducers: {
        getNavigationRedux(state, {payload}) {
            return {...state, navigation: payload};
        },
    },
});

export const {getNavigationRedux} = navigationSlice.actions;

export const selectNavigation = state => state.navigation;

export default navigationSlice.reducer;
