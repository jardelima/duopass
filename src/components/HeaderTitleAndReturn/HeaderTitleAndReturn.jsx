import {View, Text, TouchableOpacity} from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import styles from "./style";
import {getNavigationRedux} from "../../redux/navigation/navigationSlice";

export default function HeaderTitleAndReturn(props) {
    const {title} = props;

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {routes} = navigation.getState();
    const prevRoute = routes[routes.length - 2].name;

    const goBackPrevPage = () => {
        dispatch(getNavigationRedux(prevRoute));
        navigation.navigate(prevRoute);
    };

    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.headerButtonReturn}
                onPress={goBackPrevPage}>
                <MaterialIcons
                    name="keyboard-arrow-left"
                    size={20}
                    color="#FFA336"
                />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
}
