import React, {useRef, useState} from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    Animated,
    ScrollView,
    ImageBackground,
} from "react-native";
import Icons from "react-native-vector-icons/Ionicons";
import IconsFeather from "react-native-vector-icons/Feather";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import styles from "./style";

import Logo from "../../assets/images/logo.png";
import ImageUserNotFound from "../../assets/images/image-user-not-found.png";
import BackgroundImage from "../../assets/images/background-menu-top.png";
import {getAuthRedux, selectAuth} from "../../redux/auth/authSlice";
import {getNavigationRedux} from "../../redux/navigation/navigationSlice";

export default function MenuTop() {
    const [menuOpen, setMenuOpen] = useState(false);

    const fadeMenu = useRef(new Animated.Value(30)).current;
    const opacityMenu = useRef(new Animated.Value(0)).current;

    const auth = useSelector(selectAuth);
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const openMenu = () => {
        setMenuOpen(true);

        Animated.timing(fadeMenu, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();

        Animated.timing(opacityMenu, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const closeMenu = () => {
        Animated.timing(fadeMenu, {
            toValue: 30,
            duration: 200,
            useNativeDriver: true,
        }).start();

        Animated.timing(opacityMenu, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            setMenuOpen(false);
        }, 400);
    };

    return (
        <>
            <ImageBackground
                source={BackgroundImage}
                resizeMode="cover"
                style={styles.menuBackgroundImage}>
                <View style={styles.menuTop}>
                    <Image source={Logo} style={styles.logo} />

                    <TouchableOpacity onPress={openMenu}>
                        <Icons name="menu-outline" size={32} color="white" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            {menuOpen && (
                <Animated.View
                    style={[
                        styles.menu,
                        {
                            pointerEvents: menuOpen ? "auto" : "none",
                            opacity: opacityMenu,
                            transform: [{translateX: fadeMenu}],
                        },
                    ]}>
                    <TouchableOpacity
                        style={styles.buttonCloseMenu}
                        onPress={closeMenu}>
                        <Icons name="close-outline" size={32} color="#FFA336" />
                    </TouchableOpacity>

                    <ScrollView style={{flex: 1, paddingTop: 30}}>
                        <View style={styles.user}>
                            {auth.auth.userLogged && auth.auth.userPhoto && (
                                <Image
                                    source={{uri: auth.auth.userPhoto}}
                                    style={[styles.userImage, {opacity: 1}]}
                                />
                            )}
                            {auth.auth.userLogged && !auth.auth.userPhoto && (
                                <Image
                                    source={ImageUserNotFound}
                                    style={styles.userImage}
                                />
                            )}
                            {!auth.auth.userLogged && (
                                <Image
                                    source={ImageUserNotFound}
                                    style={styles.userImage}
                                />
                            )}
                            <Text style={styles.userName}>
                                {auth.auth.userLogged
                                    ? `${auth.auth.userName.split(" ")[0]}`
                                    : "Nome do usuário"}
                            </Text>
                        </View>

                        <View style={styles.blockWithBorderBottom}>
                            <TouchableOpacity
                                style={styles.buttonMenu}
                                onPress={() => {
                                    setTimeout(() => {
                                        setMenuOpen(false);
                                    }, 500);

                                    if (!auth.auth.userLogged) {
                                        dispatch(getNavigationRedux("Login"));
                                        navigation.navigate("Login");
                                        return;
                                    }

                                    dispatch(getNavigationRedux("User"));
                                    navigation.navigate("User");
                                }}>
                                <IconsFeather
                                    name="user"
                                    size={24}
                                    color="#FFA336"
                                />
                                <Text style={styles.buttonMenuText}>
                                    Perfil
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.buttonMenu}
                                onPress={() => {
                                    setTimeout(() => {
                                        setMenuOpen(false);
                                    }, 500);

                                    if (!auth.auth.userLogged) {
                                        dispatch(getNavigationRedux("Login"));
                                        navigation.navigate("Login");
                                        return;
                                    }

                                    dispatch(getNavigationRedux("Historic"));
                                    navigation.navigate("Historic");
                                }}>
                                <Icons
                                    name="document-outline"
                                    size={24}
                                    color="#FFA336"
                                />
                                <Text style={styles.buttonMenuText}>
                                    Seu histórico
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={[
                                styles.blockWithBorderBottom,
                                {borderBottomWidth: 0},
                            ]}>
                            <TouchableOpacity
                                style={styles.buttonMenu}
                                onPress={() => {
                                    closeMenu();

                                    dispatch(getNavigationRedux("AllItems"));
                                    navigation.navigate("AllItems");
                                }}>
                                <Text style={styles.buttonMenuText}>
                                    Ofertas disponíveis
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.buttonMenu}
                                onPress={() => {
                                    setTimeout(() => {
                                        setMenuOpen(false);
                                    }, 500);

                                    if (!auth.auth.userLogged) {
                                        dispatch(getNavigationRedux("Login"));
                                        navigation.navigate("Login");
                                        return;
                                    }

                                    dispatch(getNavigationRedux("TypesPass"));
                                    navigation.navigate("TypesPass");
                                }}>
                                <Text style={styles.buttonMenuText}>
                                    {auth.auth.userLogged
                                        ? "Renovar assinatura"
                                        : "Assinar"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* <View
                            style={[
                                styles.blockWithBorderBottom,
                                {borderBottomWidth: 0},
                            ]}>
                            <TouchableOpacity style={styles.buttonMenu}>
                                <Text style={styles.buttonMenuText}>
                                    Sobre o Duopass
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonMenu}>
                                <Text style={styles.buttonMenuText}>
                                    Como funciona
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonMenu}>
                                <Text style={styles.buttonMenuText}>
                                    Contato
                                </Text>
                            </TouchableOpacity>
                        </View> */}
                    </ScrollView>

                    <TouchableOpacity
                        style={styles.logout}
                        onPress={() => {
                            if (auth.auth.userLogged) {
                                dispatch(
                                    getAuthRedux({
                                        userLogged: false,
                                        userToken: "",
                                        userName: "",
                                        userPhoto: "",
                                    }),
                                );
                            }

                            dispatch(getNavigationRedux("Login"));
                            navigation.navigate("Login");

                            setTimeout(() => {
                                setMenuOpen(false);
                            }, 500);
                        }}>
                        <Text style={styles.logoutText}>
                            {auth.auth.userLogged ? "Sair" : "Entrar"}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </>
    );
}
