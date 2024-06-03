import {
    Text,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Keyboard,
    Image,
    TouchableOpacity,
    View,
    StatusBar,
} from "react-native";
import React, {useState} from "react";
import Icons from "react-native-vector-icons/MaterialIcons";
import styles from "./style";

// Images
import Logo from "../../../assets/images/logo.png";
import CircleBottom from "../../../assets/images/circle-bottom.png";
import Input from "../../../components/Input/Input";
import ModalError from "../../../components/ModalError/ModalError";
import ModalSuccess from "../../../components/ModalSuccess/ModalSuccess";
import Loading from "../../../components/Loading/Loading";
import {API, API_KEY} from "@env";

export default function RecoverPassword({navigation}) {
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [messageModalError, setMessageModalError] = useState("");
    const [modalSuccess, setModalSuccess] = useState(false);
    const [messageModalSuccess, setMessageModalSuccess] = useState("");

    const finishRecoverPassword = async () => {
        Keyboard.dismiss();
        setLoading(true);

        const validateEmail =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email === "" || !validateEmail.test(email)) {
            setLoading(false);
            setMessageModalError("Preencha seu e-mail corretamente");
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);

            return;
        }

        try {
            const response = await fetch(`${API}/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-DUOPASS-API-KEY": API_KEY,
                },
                body: JSON.stringify({
                    email,
                }),
            });

            if (response.ok) {
                setMessageModalError("");
                setMessageModalSuccess(
                    "Você receberá instruções no seu e-mail",
                );
                setModalSuccess(true);

                setTimeout(() => {
                    navigation.navigate("Login");
                    setEmail("");
                    setModalSuccess(false);
                }, 2400);

                return;
            }

            setMessageModalError("Usuário não encontrado");
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
        } catch (error) {
            setMessageModalError(
                "Erro ao tentar enviar solicitação. Tente novamente mais tarde.",
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
                translucent
                backgroundColor="rgba(0,0,0,0.0)"
                barStyle="light-content"
            />

            {modalError && (
                <ModalError visible={modalError} message={messageModalError} />
            )}

            {loading && <Loading />}

            {modalSuccess && (
                <ModalSuccess
                    visible={modalSuccess}
                    message={messageModalSuccess}
                />
            )}

            <KeyboardAvoidingView
                enabled
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{backgroundColor: "#EA5B0C", flex: 1}}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.buttonReturn}
                        onPress={() => {
                            navigation.navigate("Login");
                        }}>
                        <Icons
                            name="keyboard-arrow-left"
                            size={24}
                            color="#FFA336"
                        />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Recuperar senha</Text>
                </View>

                <Pressable
                    onPress={() => Keyboard.dismiss()}
                    style={styles.container}>
                    <Image source={Logo} style={styles.logo} />

                    <View style={{flex: 1, zIndex: 10}}>
                        <Text style={styles.title}>Recuperar senha</Text>
                        <Text style={styles.subtitle}>
                            Digite o e-mail da senha que deseja recuperar
                        </Text>

                        <Input
                            label="E-mail"
                            name="email"
                            value={email}
                            onChange={setEmail}
                            keyboardType="email-address"
                            colorLabel="#fff"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.finishRegisterButton}
                        onPress={finishRecoverPassword}>
                        <Text style={styles.finishRegisterText}>
                            Enviar link de recuperação de senha
                        </Text>
                    </TouchableOpacity>

                    <Image source={CircleBottom} style={styles.circleBottom} />
                </Pressable>
            </KeyboardAvoidingView>
        </>
    );
}
