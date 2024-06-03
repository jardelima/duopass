import {View} from "react-native";
import React from "react";
import FeatherIcons from "react-native-vector-icons/Feather";
import styles from "./style";

export default function TagPercentage() {
    return (
        <View style={styles.tagPercentage}>
            <FeatherIcons name="percent" size={14} color="#EA9C5A" />
        </View>
    );
}
