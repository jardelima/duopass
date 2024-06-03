import {createSlice} from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: "filter",
    initialState: {
        filter: [
            {
                category: "",
            },
        ],
    },
    reducers: {
        getFilterRedux(state, {payload}) {
            return {...state, filter: payload};
        },
    },
});

export const {getFilterRedux} = filterSlice.actions;

export const selectFilter = state => state.filter;

export default filterSlice.reducer;
