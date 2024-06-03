import {createSlice} from "@reduxjs/toolkit";

export const offerSlice = createSlice({
    name: "offer",
    initialState: {
        offer: "",
    },
    reducers: {
        getOfferRedux(state, {payload}) {
            return {...state, offer: payload};
        },
    },
});

export const {getOfferRedux} = offerSlice.actions;

export const selectOffer = state => state.offer;

export default offerSlice.reducer;
