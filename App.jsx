/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-redux";
import store from "./src/redux/store";
import Routes from "./src/routes/Routes";

const linking = {
    prefixes: ["duopass://"],
    config: {
        screens: {
            NewPassword: {
                path: "NewPassword/:token",
            },
        },
    },
};

function App() {
    return (
        <Provider store={store}>
            <NavigationContainer linking={linking}>
                <Routes />
            </NavigationContainer>
        </Provider>
    );
}

export default App;
