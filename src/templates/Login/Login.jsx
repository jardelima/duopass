import {
    View,
    Animated,
    Text,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Keyboard,
    TouchableOpacity,
    TextInput,
    StatusBar,
} from "react-native";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {API, API_KEY} from "@env";
import styles from "./style";

// Images
import Logo from "../../assets/images/logo.png";
import CircleBottom from "../../assets/images/circle-bottom.png";
import {getNavigationRedux} from "../../redux/navigation/navigationSlice";
import {getAuthRedux, selectAuth} from "../../redux/auth/authSlice";
import Loading from "../../components/Loading/Loading";
import ModalError from "../../components/ModalError/ModalError";

export default function Login({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [messageModalError, setMessageModalError] = useState("");

    const logoOpacityAnim = useRef(new Animated.Value(0)).current;
    const logoTransition = useRef(new Animated.Value(-20)).current;
    const circleOpacityAnim = useRef(new Animated.Value(0)).current;
    const circleTransition = useRef(new Animated.Value(20)).current;
    const formAnim = useRef(new Animated.Value(0)).current;

    const dispatch = useDispatch();

    const auth = useSelector(selectAuth);

    const {routes} = navigation.getState();
    const prevRoute = routes[routes.length - 2].name;

    const goBackPrevPage = () => {
        if (prevRoute === "User" && !auth.auth.userLogged) {
            dispatch(getNavigationRedux("Home"));
            navigation.navigate("Home");

            return;
        }

        dispatch(getNavigationRedux(prevRoute));
        navigation.navigate(prevRoute);
    };

    Animated.timing(logoOpacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
    }).start();

    Animated.timing(logoTransition, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
    }).start();

    Animated.timing(circleOpacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
    }).start();

    Animated.timing(circleTransition, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
    }).start();

    setTimeout(() => {
        Animated.timing(formAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, 1000);

    const handleLogin = async () => {
        setLoading(true);

        if (email === "" || password === "") {
            setMessageModalError("Preencha os campos vazios");
            setModalError(true);
            setLoading(false);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
            return;
        }

        try {
            const response = await fetch(`${API}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-DUOPASS-API-KEY": API_KEY,
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const userResponse = await response.json();

            if (!response.ok) {
                setMessageModalError(userResponse.message);
                setModalError(true);

                setTimeout(() => {
                    setModalError(false);
                }, 2400);

                return;
            }

            dispatch(
                getAuthRedux({
                    userLogged: true,
                    userToken: userResponse.data.token,
                    userName: userResponse.data.user.name,
                    userPhoto: userResponse.data.user.avatar,
                }),
            );

            dispatch(getNavigationRedux("Home"));
            navigation.navigate("Home");
        } catch (error) {
            console.log(`Erro ao tentar fazer login ${error}`);
            setMessageModalError(
                "Erro ao tentar fazer o login. Tente novamente mais tarde",
            );
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="rgba(0,0,0,0)"
                translucent
            />
            <KeyboardAvoidingView
                enabled
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{backgroundColor: "#EA5B0C", flex: 1}}>
                {loading && <Loading />}

                {modalError && (
                    <ModalError
                        visible={modalError}
                        message={messageModalError}
                    />
                )}

                <Pressable
                    onPress={() => Keyboard.dismiss()}
                    style={styles.container}>
                    <Animated.View
                        style={[
                            styles.headerButtonReturn,
                            {opacity: formAnim},
                        ]}>
                        <TouchableOpacity onPress={goBackPrevPage}>
                            <MaterialIcons
                                name="keyboard-arrow-left"
                                size={20}
                                color="#FFA336"
                            />
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.Image
                        source={Logo}
                        style={[
                            styles.logo,
                            {
                                opacity: logoOpacityAnim,
                                transform: [{translateY: logoTransition}],
                            },
                        ]}
                    />

                    <Animated.ScrollView
                        style={{opacity: formAnim, zIndex: 10}}>
                        <Text style={styles.title}>Seja bem-vindo!</Text>

                        <View style={styles.field}>
                            <Text style={styles.label}>E-mail</Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                                keyboardType="email-address"
                                underlineColorAndroid="transparent"
                                autoCorrect={false}
                                autoCapitalize="none"
                                placeholder="example@email.com"
                                placeholderTextColor="rgba(0,0,0,0.4)"
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                style={styles.input}
                                keyboardType="default"
                                underlineColorAndroid="transparent"
                                autoCorrect={false}
                                autoCapitalize="none"
                                secureTextEntry
                                placeholder="***********"
                                placeholderTextColor="rgba(0,0,0,0.4)"
                            />
                        </View>

                        <View style={styles.forgotPassword}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("RecoverPassword")
                                }>
                                <Text style={styles.forgotPasswordText}>
                                    Esqueceu a senha?
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.login}
                            onPress={handleLogin}>
                            <Text style={styles.loginText}>Acessar</Text>
                        </TouchableOpacity>

                        <View style={styles.register}>
                            <Text style={styles.registerTitle}>
                                Ainda não tem uma conta?
                            </Text>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("Register")}>
                                <Text style={styles.registerTextButton}>
                                    Registre-se aqui
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.ScrollView>

                    <Animated.Image
                        source={CircleBottom}
                        style={[
                            styles.circleBottom,
                            {
                                opacity: circleOpacityAnim,
                                transform: [{translateY: circleTransition}],
                            },
                        ]}
                    />
                </Pressable>
            </KeyboardAvoidingView>
        </>
    );
}
