import {View, Text, Animated} from "react-native";
import React, {useRef} from "react";
import Icons from "react-native-vector-icons/Ionicons";
import styles from "./style";

export default function ModalSuccess(props) {
    const {visible, message} = props;

    const fadeModal = useRef(new Animated.Value(0)).current;

    Animated.timing(fadeModal, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
    }).start();

    setTimeout(() => {
        Animated.timing(fadeModal, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, 2000);

    return (
        <Animated.View
            style={[
                styles.modalContainer,
                {
                    opacity: fadeModal,
                    pointerEvents: visible ? "auto" : "none",
                },
            ]}>
            <View style={styles.modalBox}>
                <Icons
                    name="checkmark-circle-outline"
                    size={30}
                    color="green"
                />
                <Text style={styles.modalText}>{message}</Text>
            </View>
        </Animated.View>
    );
}
