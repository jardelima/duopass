import {View, Text, TouchableOpacity} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import styles from "./style";

export default function CardContainer({children, title, navigate, items}) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{title}</Text>
                {items > 0 && (
                    <TouchableOpacity
                        onPress={() => navigation.navigate(navigate)}>
                        <Text style={styles.seeAll}>Ver todos</Text>
                    </TouchableOpacity>
                )}
            </View>

            {children}
        </View>
    );
}
