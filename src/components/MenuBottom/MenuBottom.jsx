import React from "react";
import {View, TouchableOpacity} from "react-native";
import Icons from "react-native-vector-icons/Feather";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import styles from "./style";
import {
    getNavigationRedux,
    selectNavigation,
} from "../../redux/navigation/navigationSlice";
import {selectAuth} from "../../redux/auth/authSlice";

const buttons = [
    {
        name: "home",
        page: "Home",
    },
    {
        name: "map-pin",
        page: "FilterStatesAndCity",
    },
    {
        name: "tag",
        page: "TypesPass",
    },
    {
        name: "user",
        page: "User",
    },
];

export default function MenuBottom() {
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const menuNavigation = useSelector(selectNavigation);
    const auth = useSelector(selectAuth);

    const handleButtonMenu = page => {
        if (!auth.auth.userLogged && page === "User") {
            navigation.navigate("Login");
            return;
        }

        navigation.navigate(page);
        dispatch(getNavigationRedux(page));
    };

    const getBackgroundColor = button => {
        if (menuNavigation.navigation === "Home" && button === "Home") {
            return "#FFA336";
        }

        if (menuNavigation.navigation === "User" && button === "User") {
            return "#FFA336";
        }

        if (menuNavigation.navigation === "Historic" && button === "User") {
            return "#FFA336";
        }

        if (
            menuNavigation.navigation === "TypesPass" &&
            button === "TypesPass"
        ) {
            return "#FFA336";
        }

        if (menuNavigation.navigation === "Buy" && button === "TypesPass") {
            return "#FFA336";
        }

        if (
            menuNavigation.navigation === "FilterStatesAndCity" &&
            button === "FilterStatesAndCity"
        ) {
            return "#FFA336";
        }

        return "#EA5B0C";
    };

    return (
        <View style={styles.menu}>
            {buttons.map(button => (
                <TouchableOpacity
                    key={button.name}
                    onPress={() => handleButtonMenu(button.page)}
                    style={[
                        styles.menuButton,
                        {
                            backgroundColor: getBackgroundColor(button.page),
                        },
                    ]}>
                    <Icons name={button.name} size={24} color="#fff" />
                </TouchableOpacity>
            ))}
        </View>
    );
}
