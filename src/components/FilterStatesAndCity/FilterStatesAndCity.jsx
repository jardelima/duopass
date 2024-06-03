import React from "react";
import {Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import Icons from "react-native-vector-icons/MaterialIcons";
import {selectLocation} from "../../redux/location/locationSlice";
import styles from "./style";

export default function FilterStatesAndCity() {
    const stateAndCity = "Jericoacoara / CE";

    const navigation = useNavigation();

    const location = useSelector(selectLocation);

    const handleButtonFilterStatesAndCity = () => {
        navigation.navigate("FilterStatesAndCity");
    };

    return (
        <TouchableOpacity
            style={styles.filterStates}
            onPress={handleButtonFilterStatesAndCity}>
            <Text style={styles.filterStatesText}>
                {location.location ? location.location : stateAndCity}
            </Text>
            <Icons name="arrow-forward-ios" size={16} color="#FFA336" />
        </TouchableOpacity>
    );
}
