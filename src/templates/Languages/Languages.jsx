import React, {useRef, useState} from "react";
import {Animated, Image, Text, TouchableOpacity, View} from "react-native";

// Icons
import Icons from "react-native-vector-icons/Ionicons";

// Images
import {SafeAreaView} from "react-native-safe-area-context";
import {Modal} from "react-native-paper";
import CircleTop from "../../assets/images/circle-top.png";
import LogoDuopass from "../../assets/images/logo.png";
import Brazil from "../../assets/images/brazil.png";
import France from "../../assets/images/france.png";
import English from "../../assets/images/english.png";
import Espanol from "../../assets/images/espanol.png";
import Italy from "../../assets/images/italy.png";

// Style
import styles from "./style";

const languages = [
    {
        type: "brazil",
        title: "Português",
        img: Brazil,
    },
    {
        type: "english",
        title: "English",
        img: English,
    },
    {
        type: "espanol",
        title: "Español",
        img: Espanol,
    },
    {
        type: "italy",
        title: "Italy",
        img: Italy,
    },
    {
        type: "france",
        title: "France",
        img: France,
    },
];

export default function Languages({navigation}) {
    const [language, setLanguage] = useState("");
    const [visible, setVisible] = useState(false);

    const fadeCircleTop = useRef(new Animated.Value(-20)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const logoOpacityAnim = useRef(new Animated.Value(0)).current;

    Animated.timing(fadeCircleTop, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
    }).start();

    Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
    }).start();

    setTimeout(() => {
        Animated.timing(logoOpacityAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, 1000);

    if (visible) {
        setTimeout(() => {
            setVisible(false);
        }, 2000);
    }

    return (
        <SafeAreaView style={{height: "100%"}}>
            <View>
                <Animated.Image
                    source={CircleTop}
                    style={{
                        opacity: opacityAnim,
                        transform: [{translateY: fadeCircleTop}],
                    }}
                />
                <Animated.Image
                    source={LogoDuopass}
                    style={[styles.logo, {opacity: logoOpacityAnim}]}
                />
            </View>

            <Animated.View
                style={[styles.container, {opacity: logoOpacityAnim}]}>
                <Text style={styles.title}>Seja bem-vindo!</Text>
                <Text style={styles.subtitle}>Selecione um idioma</Text>
            </Animated.View>

            <Animated.View
                style={[styles.container, {opacity: logoOpacityAnim}]}>
                {languages.map(item => (
                    <TouchableOpacity
                        key={item.type}
                        onPress={() => setLanguage(item.type)}
                        style={[
                            styles.selectLanguage,
                            {
                                borderWidth: language === item.type ? 2 : 1,
                                borderColor:
                                    language === item.type
                                        ? "#EA5B0C"
                                        : "#D1D5DB",
                            },
                        ]}>
                        <Image
                            style={styles.selectLanguageImage}
                            source={item.img}
                        />
                        <Text style={styles.selectLanguageText}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity
                    onPress={() => {
                        if (language !== "") {
                            navigation.navigate("Onboarding");
                            return;
                        }

                        setVisible(true);
                    }}
                    style={styles.buttonNext}>
                    <Text style={styles.buttonNextText}>Continuar</Text>
                </TouchableOpacity>
            </Animated.View>

            <Modal
                visible={visible}
                onDismiss={() => setVisible(false)}
                contentContainerStyle={styles.modalContainer}>
                <View style={styles.modal}>
                    <Icons name="alert-circle-outline" size={30} color="red" />
                    <Text style={styles.modalText}>Selecione um idioma</Text>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
