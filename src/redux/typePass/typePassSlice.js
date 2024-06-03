import {createSlice} from "@reduxjs/toolkit";

export const typePassSlice = createSlice({
    name: "type-pass",
    initialState: {
        typePass: [{}],
    },
    reducers: {
        getTypePassRedux(state, {payload}) {
            return {...state, typePass: payload};
        },
    },
});

export const {getTypePassRedux} = typePassSlice.actions;

export const selectTypePass = state => state.typePass;

export default typePassSlice.reducer;
