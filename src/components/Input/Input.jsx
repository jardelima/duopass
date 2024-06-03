import {View, Text, TextInput} from "react-native";
import React from "react";
import styles from "./style";

export default function Input(props) {
    const {label, value, onChange, colorLabel} = props;

    return (
        <View style={styles.field}>
            <Text style={[styles.label, {color: colorLabel}]}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChange}
                style={styles.input}
                underlineColorAndroid="transparent"
                autoCorrect={false}
                autoCapitalize="none"
                {...props}
            />
        </View>
    );
}
