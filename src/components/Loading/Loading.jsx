import {ActivityIndicator, View} from "react-native";
import React from "react";
import styles from "./style";

export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="medium" color="#fff" />
        </View>
    );
}
