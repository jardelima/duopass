import {createSlice} from "@reduxjs/toolkit";

export const locationSlice = createSlice({
    name: "location",
    initialState: {
        location: null,
    },
    reducers: {
        getLocationRedux(state, {payload}) {
            return {...state, location: payload};
        },
    },
});

export const {getLocationRedux} = locationSlice.actions;

export const selectLocation = state => state.location;

export default locationSlice.reducer;
