import React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Splash from "../templates/Splash/Splash";
import Languages from "../templates/Languages/Languages";
import Onboarding from "../templates/Onboarding/Onboarding";
import Login from "../templates/Login/Login";
import Register from "../templates/Register/Register";
import Home from "../templates/Home/Home";
import FilterStatesAndCity from "../templates/FilterStatesAndCity/FilterStatesAndCity";
import Store from "../templates/Store/Store";
import User from "../templates/User/User";
import Buy from "../templates/Buy/Buy";
import TypesPass from "../templates/TypePass/TypesPass";
import Historic from "../templates/Historic/Historic";
import AllItems from "../templates/AllItems/AllItems";
import RecoverPassword from "../templates/ForgotPassword/RecoverPassword/RecoverPassword";
import NewPassword from "../templates/ForgotPassword/NewPassword/NewPassword";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <SafeAreaProvider>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Languages" component={Languages} />
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen
                    name="RecoverPassword"
                    component={RecoverPassword}
                />
                <Stack.Screen name="NewPassword" component={NewPassword} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AllItems" component={AllItems} />
                <Stack.Screen
                    name="FilterStatesAndCity"
                    component={FilterStatesAndCity}
                />
                <Stack.Screen name="Store" component={Store} />
                <Stack.Screen name="User" component={User} />
                <Stack.Screen name="TypesPass" component={TypesPass} />
                <Stack.Screen name="Buy" component={Buy} />
                <Stack.Screen name="Historic" component={Historic} />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}
