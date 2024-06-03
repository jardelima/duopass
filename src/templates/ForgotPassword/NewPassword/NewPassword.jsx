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
    ScrollView,
} from "react-native";
import React, {useState} from "react";
import Icons from "react-native-vector-icons/MaterialIcons";
import {useSelector} from "react-redux";
import styles from "./style";

// Images
import Logo from "../../../assets/images/logo.png";
import CircleBottom from "../../../assets/images/circle-bottom.png";
import Input from "../../../components/Input/Input";
import ModalError from "../../../components/ModalError/ModalError";
import ModalSuccess from "../../../components/ModalSuccess/ModalSuccess";
import Loading from "../../../components/Loading/Loading";
import {selectNewPassword} from "../../../redux/newPassword/newPasswordSlice";
import {API, API_KEY} from "@env";

export default function NewPassword({navigation}) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [messageModalError, setMessageModalError] = useState("");
    const [modalSuccess, setModalSuccess] = useState(false);
    const [messageModalSuccess, setMessageModalSuccess] = useState("");

    const token = useSelector(selectNewPassword);

    const finishRecoverPassword = async () => {
        Keyboard.dismiss();
        setLoading(true);

        if (password === "" || confirmPassword === "") {
            setLoading(false);
            setMessageModalError("Digite sua senha corretamente");
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
            return;
        }

        if (Array.from(password).length < 9) {
            setLoading(false);
            setMessageModalError("A senha deve ter no mínimo 9 caracteres");
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
            return;
        }

        if (password !== confirmPassword) {
            setLoading(false);
            setMessageModalError("As senhas não são iguais");
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
            return;
        }

        try {
            const response = await fetch(
                `${API}/forgot-password/reset`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-DUOPASS-API-KEY": API_KEY,
                    },
                    body: JSON.stringify({
                        token: token.newPassword,
                        password,
                        password_confirm: confirmPassword,
                    }),
                },
            );

            const resetResponse = await response.json();

            if (response.ok) {
                setMessageModalError("");
                setMessageModalSuccess("Senha alterada com sucesso!");
                setModalSuccess(true);

                setTimeout(() => {
                    navigation.navigate("Login");
                    setPassword("");
                    setConfirmPassword("");
                    setModalSuccess(false);
                }, 2400);

                return;
            }

            setMessageModalError(resetResponse.data.message);
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
        } catch (error) {
            setMessageModalError("As senhas não são iguais");
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
            return;
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
                            navigation.navigate("login");
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

                    <ScrollView style={{flex: 1, zIndex: 10}}>
                        <Text style={styles.title}>Recuperar senha</Text>
                        <Text style={styles.subtitle}>
                            Digite a sua nova senha
                        </Text>

                        <Input
                            label="Senha"
                            value={password}
                            onChange={setPassword}
                            keyboardType="default"
                            secureTextEntry
                            colorLabel="#fff"
                        />

                        <Input
                            label="Confirmar senha"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            keyboardType="default"
                            secureTextEntry
                            colorLabel="#fff"
                        />
                    </ScrollView>

                    <TouchableOpacity
                        style={styles.finishRegisterButton}
                        onPress={finishRecoverPassword}>
                        <Text style={styles.finishRegisterText}>
                            Alterar senha
                        </Text>
                    </TouchableOpacity>

                    <Image source={CircleBottom} style={styles.circleBottom} />
                </Pressable>
            </KeyboardAvoidingView>
        </>
    );
}
