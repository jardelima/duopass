import {configureStore} from "@reduxjs/toolkit";
import locationReducer from "./location/locationSlice";
import navigationReducer from "./navigation/navigationSlice";
import authReducer from "./auth/authSlice";
import typePassReducer from "./typePass/typePassSlice";
import offerReducer from "./offer/offerSlice";
import filterReducer from "./filter/filterSlice";
import newPasswordReducer from "./newPassword/newPasswordSlice";

export default configureStore({
    reducer: {
        location: locationReducer,
        navigation: navigationReducer,
        auth: authReducer,
        typePass: typePassReducer,
        offer: offerReducer,
        filter: filterReducer,
        newPassword: newPasswordReducer,
    },
});
