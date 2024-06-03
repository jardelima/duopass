import {View} from "react-native";
import React from "react";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import styles from "./style";

export default function TagIcon() {
    return (
        <View style={styles.tagIcon}>
            <EvilIcons name="tag" size={22} color="#2F80F5" />
        </View>
    );
}
