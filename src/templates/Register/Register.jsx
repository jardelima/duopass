import {
    Text,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Keyboard,
    Image,
    TouchableOpacity,
    View,
    ScrollView,
    StatusBar,
    Animated,
} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import Icons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaskInput, {Masks} from "react-native-mask-input";
import {launchImageLibrary} from "react-native-image-picker";
import styles from "./style";

// Images
import Logo from "../../assets/images/logo.png";
import CircleBottom from "../../assets/images/circle-bottom.png";
import Input from "../../components/Input/Input";
import ModalError from "../../components/ModalError/ModalError";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
import Loading from "../../components/Loading/Loading";
import {API, API_KEY} from "@env";

const typesDocument = [
    {label: "CPF", value: "cpf", key: 0},
    {label: "RG", value: "rg", key: 1},
    {label: "CNH", value: "cnh", key: 2},
    {label: "PASSAPORTE", value: "passaporte", key: 3},
];

const rgMask = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
];

const passportMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

export default function Register({navigation}) {
    const [name, setName] = useState("");
    const [typeDocument, setTypeDocument] = useState("");
    const [idPerson, setIdPerson] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [terms, setTerms] = useState(false);
    const [politics, setPolitics] = useState(false);
    const [errors, setErrors] = useState([]);
    const [modalRegisterError, setModalRegisterError] = useState(false);
    const [messageError, setMessageError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoUser, setPhotoUser] = useState("");

    const [modalSelectDocument, setModalSelectDocument] = useState(false);

    const [progressBar, setProgressBar] = useState(36);
    const [stepRegister, setStepRegister] = useState(1);

    const [modalError, setModalError] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);

    const fadeModalDocument = useRef(new Animated.Value(0)).current;

    const openModalDocument = () => {
        Keyboard.dismiss();
        setModalSelectDocument(true);

        Animated.timing(fadeModalDocument, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const closeModalDocument = () => {
        setTypeDocument("");
        setModalSelectDocument(false);

        Animated.timing(fadeModalDocument, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const finishModalDocument = () => {
        setModalSelectDocument(false);

        Animated.timing(fadeModalDocument, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const fadeModal = useRef(new Animated.Value(0)).current;

    Animated.timing(fadeModal, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
    }).start();

    const nextProgressRegister = () => {
        if (progressBar < 75 && stepRegister < 3) {
            setProgressBar(progressBar + 36);
            setStepRegister(stepRegister + 1);
        }
    };

    const backProgressRegister = () => {
        setProgressBar(progressBar - 36);
        setStepRegister(stepRegister - 1);
    };

    const setProfileImage = () => {
        launchImageLibrary(
            {
                mediaType: "photo",
                quality: 1,
                includeBase64: true,
            },
            item => setPhotoUser(item),
        );
    };

    const validationFormStepOne = () => {
        Keyboard.dismiss();

        const validateEmail =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (name === "") {
            setMessageError("Preencha seu nome corretamente");
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);

            return;
        }

        if (Array.from(name).length < 6) {
            setMessageError(
                "O campo nome completo deve ter no mínimo 6 caracteres",
            );
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);

            return;
        }

        if (typeDocument === "" || !typeDocument) {
            setMessageError("Selecione o tipo de documento");
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);

            return;
        }

        if (idPerson === "") {
            setMessageError("Preencha seus dados corretamente");
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);

            return;
        }

        if (email === "" || !validateEmail.test(email)) {
            setMessageError("Preencha seu e-mail corretamente");
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);

            return;
        }

        nextProgressRegister();
    };

    const validationFormStepTwo = () => {
        Keyboard.dismiss();

        if (password === "" || confirmPassword === "") {
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
            return;
        }

        if (Array.from(password).length < 9) {
            setMessageError("A senha deve ter no mínimo 9 caracteres");
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
            return;
        }

        if (password !== confirmPassword) {
            setMessageError("As senhas não são iguais");
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
            return;
        }

        setMessageError(null);
        nextProgressRegister();
    };

    const finishRegister = async () => {
        if (!terms || !politics) {
            setMessageError(
                "Você não aceitou os termos de uso e políticas de privacidade",
            );
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);

            return;
        }

        setLoading(true);

        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("password_confirm", confirmPassword);
        formData.append("terms", 1);
        formData.append("policy", 1);
        formData.append("cpf", idPerson);

        if (photoUser !== "") {
            formData.append("photo_profile", photoUser.assets[0].base64);
        }

        try {
            const response = await fetch(`${API}/register`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    "X-DUOPASS-API-KEY": API_KEY,
                },
                body: formData,
            });

            const registerResponse = await response.json();

            if (response.ok) {
                setMessageError(null);

                setModalSuccess(true);

                setTimeout(() => {
                    navigation.navigate("Login");
                    setModalSuccess(false);
                }, 2400);

                return;
            }

            if (registerResponse.errors) {
                setErrors([]);

                Object.entries(registerResponse.errors).forEach(item => {
                    setErrors(prev => [...prev, item[1][0]]);
                });
            }

            setModalRegisterError(true);

            setTimeout(() => {
                Animated.timing(fadeModal, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }).start();
            }, 2000);

            setTimeout(() => {
                setModalRegisterError(false);
            }, 2400);
        } catch (error) {
            console.log("Erro ao tentar fazer cadastro do usuário", error);

            setMessageError(
                "Erro ao fazer cadastro do usuário. Tente novamente mais tarde.",
            );
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setIdPerson("");
    }, [typeDocument]);

    return (
        <>
            <StatusBar
                translucent
                backgroundColor="rgba(0,0,0,0.0)"
                barStyle="light-content"
            />

            {modalRegisterError && (
                <Animated.View
                    style={[
                        styles.modalContainerError,
                        {
                            opacity: fadeModal,
                            pointerEvents: modalRegisterError ? "auto" : "none",
                        },
                    ]}>
                    <View style={styles.modalBoxError}>
                        <Ionicons
                            name="alert-circle-outline"
                            size={30}
                            color="red"
                        />
                        {errors.length > 0 &&
                            errors.map(error => (
                                <Text key={error} style={styles.modalTextError}>
                                    {error}
                                </Text>
                            ))}
                    </View>
                </Animated.View>
            )}

            {modalSelectDocument && (
                <Animated.View
                    style={[
                        styles.modalContainer,
                        {
                            opacity: fadeModalDocument,
                            pointerEvents: modalSelectDocument
                                ? "auto"
                                : "none",
                        },
                    ]}>
                    <View style={styles.modalBox}>
                        <TouchableOpacity
                            style={styles.closeModal}
                            onPress={closeModalDocument}>
                            <Icons name="close" size={20} color="#EA5B0C" />
                        </TouchableOpacity>

                        <ScrollView style={{marginVertical: 25}}>
                            {typesDocument.map(type => (
                                <TouchableOpacity
                                    key={type.key}
                                    style={[
                                        styles.selectOptionItem,
                                        {
                                            borderColor:
                                                typeDocument === type.value
                                                    ? "#FFA336"
                                                    : "rgba(0,0,0,0.1)",
                                            borderWidth:
                                                typeDocument === type.value
                                                    ? 2
                                                    : 0.5,
                                            shadowColor:
                                                typeDocument === type.value
                                                    ? "#FFA336"
                                                    : "#000",
                                        },
                                    ]}
                                    onPress={() => setTypeDocument(type.value)}>
                                    <Text style={styles.selectOptionText}>
                                        {type.label}
                                    </Text>
                                    <Icons
                                        name="check-circle"
                                        size={20}
                                        color={
                                            typeDocument === type.value
                                                ? "#FFA336"
                                                : "#fff"
                                        }
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <TouchableOpacity
                            style={styles.selectModal}
                            onPress={finishModalDocument}>
                            <Text style={styles.selectModalText}>
                                Selecionar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}

            {modalError && (
                <ModalError
                    visible={modalError}
                    message={
                        messageError || "Preencha todos os campos corretamente"
                    }
                />
            )}

            {loading && <Loading />}

            {modalSuccess && (
                <ModalSuccess
                    visible={modalSuccess}
                    message="Cadastro realizado com sucesso!"
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
                            if (stepRegister > 1) {
                                backProgressRegister();
                                return;
                            }

                            navigation.goBack();
                        }}>
                        <Icons
                            name="keyboard-arrow-left"
                            size={24}
                            color="#FFA336"
                        />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Criar conta</Text>
                </View>

                <Pressable
                    onPress={() => Keyboard.dismiss()}
                    style={styles.container}>
                    <Image source={Logo} style={styles.logo} />

                    {stepRegister === 1 && (
                        <ScrollView style={{zIndex: 10}}>
                            <Text style={styles.title}>Cadastre-se</Text>
                            <Text style={styles.subtitle}>
                                Preencha os seus dados.
                            </Text>

                            <Input
                                label="Nome Completo"
                                value={name}
                                onChange={setName}
                                keyboardType="default"
                                colorLabel="#fff"
                            />
                            <Text style={styles.label}>Tipo de documento</Text>
                            <View style={styles.pickerContainer}>
                                <TouchableOpacity
                                    style={styles.pickerInput}
                                    onPress={openModalDocument}>
                                    <Text
                                        style={[
                                            styles.pickerPlaceholder,
                                            {
                                                color:
                                                    typesDocument === ""
                                                        ? "rgba(0,0,0,0.4)"
                                                        : "#343A40",
                                            },
                                        ]}>
                                        {typeDocument === ""
                                            ? "Selecione o tipo de documento"
                                            : typeDocument.toLocaleUpperCase()}
                                    </Text>
                                    <Icons
                                        name="keyboard-arrow-down"
                                        size={16}
                                        color="rgba(0,0,0,0.6)"
                                    />
                                </TouchableOpacity>
                            </View>
                            {typeDocument === "cpf" && (
                                <View style={styles.field}>
                                    <Text style={styles.label}>CPF</Text>
                                    <MaskInput
                                        value={idPerson}
                                        onChangeText={(_, unmasked) =>
                                            setIdPerson(unmasked)
                                        }
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        mask={Masks.BRL_CPF}
                                        keyboardType="numeric"
                                    />
                                </View>
                            )}
                            {typeDocument === "rg" && (
                                <View style={styles.field}>
                                    <Text style={styles.label}>RG</Text>
                                    <MaskInput
                                        value={idPerson}
                                        onChangeText={(_, unmasked) =>
                                            setIdPerson(unmasked)
                                        }
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        mask={rgMask}
                                        keyboardType="numeric"
                                    />
                                </View>
                            )}
                            {typeDocument === "cnh" && (
                                <View style={styles.field}>
                                    <Text style={styles.label}>CNH</Text>
                                    <MaskInput
                                        value={idPerson}
                                        onChangeText={(_, unmasked) =>
                                            setIdPerson(unmasked)
                                        }
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        mask={rgMask}
                                        keyboardType="numeric"
                                    />
                                </View>
                            )}
                            {typeDocument === "passaporte" && (
                                <View style={styles.field}>
                                    <Text style={styles.label}>Passaporte</Text>
                                    <MaskInput
                                        value={idPerson}
                                        onChangeText={(_, unmasked) =>
                                            setIdPerson(unmasked)
                                        }
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        mask={passportMask}
                                        keyboardType="numeric"
                                    />
                                </View>
                            )}
                            <Input
                                label="E-mail"
                                name="email"
                                value={email}
                                onChange={setEmail}
                                keyboardType="email-address"
                                colorLabel="#fff"
                            />
                            <View style={{marginBottom: 20}}>
                                <Text style={styles.label}>Foto do perfil</Text>
                                <TouchableOpacity
                                    style={styles.selectPhoto}
                                    onPress={setProfileImage}>
                                    <Text
                                        style={[
                                            styles.selectPhotoText,
                                            {
                                                color:
                                                    photoUser === ""
                                                        ? "rgba(0,0,0,0.4)"
                                                        : "#343A40",
                                            },
                                        ]}>
                                        {photoUser === ""
                                            ? "Escolha sua foto do perfil"
                                            : photoUser.assets[0].fileName}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    )}

                    {stepRegister === 2 && (
                        <>
                            <Text style={styles.title}>Cadastre-se</Text>
                            <Text style={styles.subtitle}>
                                Agora, precisamos que crie uma senha.
                            </Text>

                            <View style={{flex: 1, zIndex: 10}}>
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
                            </View>
                        </>
                    )}

                    {stepRegister === 3 && (
                        <>
                            <Text style={[styles.title, {marginBottom: 20}]}>
                                Utilização dos dados pessoais
                            </Text>

                            <View style={{flex: 1}}>
                                <Text style={styles.description}>
                                    Ao utilizar nossos serviços, você concorda
                                    com a coleta, armazenamento e utilização dos
                                    seus dados de acordo com a nossa Política de
                                    Privacidade e Termos de Uso. Esses
                                    documentos explicam detalhadamente como os
                                    seus dados serão tratados e protegidos.
                                </Text>

                                <View style={styles.fieldCheckbox}>
                                    <TouchableOpacity
                                        style={[
                                            styles.checkbox,
                                            {
                                                borderColor: terms
                                                    ? "#FFA336"
                                                    : "#fff",
                                                backgroundColor: terms
                                                    ? "#FFA336"
                                                    : "transparent",
                                            },
                                        ]}
                                        onPress={() => setTerms(!terms)}>
                                        <Icons
                                            name="check"
                                            size={14}
                                            color={
                                                terms
                                                    ? "#EA5B0C"
                                                    : "transparent"
                                            }
                                        />
                                    </TouchableOpacity>
                                    <Text
                                        style={[
                                            styles.description,
                                            {marginTop: 6},
                                        ]}>
                                        Eu concordo com os termos de uso
                                    </Text>
                                </View>

                                <View style={styles.fieldCheckbox}>
                                    <TouchableOpacity
                                        style={[
                                            styles.checkbox,
                                            {
                                                borderColor: politics
                                                    ? "#FFA336"
                                                    : "#fff",
                                                backgroundColor: politics
                                                    ? "#FFA336"
                                                    : "transparent",
                                            },
                                        ]}
                                        onPress={() => setPolitics(!politics)}>
                                        <Icons
                                            name="check"
                                            size={14}
                                            color={
                                                politics
                                                    ? "#EA5B0C"
                                                    : "transparent"
                                            }
                                        />
                                    </TouchableOpacity>
                                    <Text
                                        style={[
                                            styles.description,
                                            {marginTop: 6},
                                        ]}>
                                        Eu concordo com as políticas de
                                        privacidade
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.finishRegisterButton}
                                onPress={finishRegister}>
                                <Text style={styles.finishRegisterText}>
                                    Finalizar cadastro
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {stepRegister < 3 && (
                        <View style={styles.footer}>
                            <View style={styles.progress}>
                                <View style={styles.progressContainer}>
                                    <View
                                        style={[
                                            styles.progressBar,
                                            {width: progressBar},
                                        ]}
                                    />
                                </View>
                                <Text style={styles.progressText}>
                                    {stepRegister}/2
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={styles.nextButton}
                                onPress={() => {
                                    if (stepRegister === 1) {
                                        validationFormStepOne();
                                        return;
                                    }

                                    validationFormStepTwo();
                                }}>
                                <Icons
                                    name="arrow-forward"
                                    size={28}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </View>
                    )}

                    <Image source={CircleBottom} style={styles.circleBottom} />
                </Pressable>
            </KeyboardAvoidingView>
        </>
    );
}
