import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Image,
    Animated,
    Keyboard,
    TextInput,
} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {useDispatch, useSelector} from "react-redux";
import MaskInput, {Masks} from "react-native-mask-input";
import {launchImageLibrary} from "react-native-image-picker";
import styles from "./style";
import MenuTop from "../../components/MenuTop/MenuTop";
import MenuBottom from "../../components/MenuBottom/MenuBottom";
import {getNavigationRedux} from "../../redux/navigation/navigationSlice";
import Input from "../../components/Input/Input";
import ModalError from "../../components/ModalError/ModalError";
import Loading from "../../components/Loading/Loading";
import {getAuthRedux, selectAuth} from "../../redux/auth/authSlice";
import Placeholder from "../../assets/images/image-user-not-found.png";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
import {API, API_KEY} from "@env";

export default function User({navigation}) {
    const [avatar, setAvatar] = useState(null);
    const [photoProfile, setPhotoProfile] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [messageModalError, setMessageModalError] = useState("");
    const [modalSuccess, setModalSuccess] = useState(false);
    const [messageModalSuccess, setMessageModalSuccess] = useState("");
    const [modalDeleteUser, setModalDeleteUser] = useState(false);
    const [messageDeleteUser, setMessageDeleteUser] = useState("");

    const fadeModalDeleteUser = useRef(new Animated.Value(0)).current;

    const dispatch = useDispatch();

    const auth = useSelector(selectAuth);

    const {routes} = navigation.getState();
    const prevRoute = routes[routes.length - 2].name;

    const goBackPrevPage = () => {
        dispatch(getNavigationRedux(prevRoute));
        navigation.navigate(prevRoute);
    };

    const openModalDeleteUser = () => {
        Keyboard.dismiss();
        setModalDeleteUser(true);

        Animated.timing(fadeModalDeleteUser, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const closeModalDeleteUser = () => {
        setMessageDeleteUser("");
        setModalDeleteUser(false);

        Animated.timing(fadeModalDeleteUser, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const deleteUser = async () => {
        setLoading(true);
        Keyboard.dismiss();

        try {
            const response = await fetch(
                `${API}/profile/cancel-account`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.auth.userToken}`,
                        "X-DUOPASS-API-KEY": API_KEY,
                    },
                    body: null,
                },
            );

            const responseDelete = await response.json();

            if (response.ok) {
                setTimeout(() => {
                    setMessageDeleteUser("");
                    setModalDeleteUser(false);
                }, 400);

                setTimeout(() => {
                    setMessageModalSuccess("Usuário excluído com sucesso!");
                    setModalSuccess(true);
                }, 400);

                setTimeout(() => {
                    setModalSuccess(false);

                    dispatch(
                        getAuthRedux({
                            userLogged: false,
                            userToken: "",
                            userName: "",
                            userPhoto: "",
                        }),
                    );

                    dispatch(getNavigationRedux("Login"));
                    navigation.navigate("Login");
                }, 2400);

                Animated.timing(fadeModalDeleteUser, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }).start();

                return;
            }

            console.log(`Erro ao tentar excluir o usuário. ${responseDelete}`);
            setMessageModalError(
                "Erro ao tentar excluir o usuário. Tente novamente mais tarde",
            );
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
        } catch (error) {
            console.log(`Erro ao tentar excluir o usuário. ${error}`);
            setMessageModalError(
                "Erro ao tentar excluir o usuário. Tente novamente mais tarde",
            );
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
        } finally {
            setLoading(false);
        }
    };

    const updateImageProfile = () => {
        launchImageLibrary(
            {
                mediaType: "photo",
                quality: 1,
                includeBase64: true,
            },
            item => {
                setAvatar(item.assets[0].uri);
                setPhotoProfile(item.assets[0].base64);
            },
        );
    };

    const getProfile = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${API}/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.auth.userToken}`,
                    "X-DUOPASS-API-KEY": API_KEY,
                },
            });

            const profileResponse = await response.json();

            if (response.ok) {
                setName(profileResponse.data.name);
                setPhone(profileResponse.data.phone);
                setEmail(profileResponse.data.email);
                setAvatar(profileResponse.data.avatar);
            }
        } catch (error) {
            console.log("Erro ao tentar pegar os dados do usuário", error);

            setMessageModalError(
                "Erro ao tentar pegar os dados do usuário. Tente novamente mais tarde.",
            );
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async () => {
        setLoading(true);

        const formData = new FormData();

        formData.append("_method", "PUT");
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);

        if (photoProfile) {
            formData.append("photo", photoProfile);
        }

        try {
            const response = await fetch(`${API}/profile/update`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${auth.auth.userToken}`,
                    "X-DUOPASS-API-KEY": API_KEY,
                },
                body: formData,
            });

            const updateResponse = await response.json();

            if (response.ok) {
                dispatch(
                    getAuthRedux({
                        userLogged: true,
                        userToken: auth.auth.userToken,
                        userName: name,
                        userPhoto: avatar,
                    }),
                );
                setMessageModalSuccess("Dados atualizados com sucesso!");
                setModalSuccess(true);

                setTimeout(() => {
                    navigation.navigate("User");
                    setModalSuccess(false);
                }, 2400);

                return;
            }

            setMessageModalError(updateResponse);
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
        } catch (error) {
            console.log("Erro ao tentar atualizar os dados do usuário", error);

            setMessageModalError(
                "Erro ao tentar atualizar os dados do usuário. Tente novamente mais tarde.",
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
        getProfile();
    }, []);

    return (
        <>
            <StatusBar
                backgroundColor="rgba(0,0,0,0)"
                translucent
                barStyle="light-content"
            />

            {modalError && (
                <ModalError visible={modalError} message={messageModalError} />
            )}

            {modalSuccess && (
                <ModalSuccess
                    visible={modalSuccess}
                    message={messageModalSuccess}
                />
            )}

            {loading && <Loading />}

            {modalDeleteUser && (
                <Animated.View
                    style={[
                        styles.modalContainer,
                        {
                            opacity: fadeModalDeleteUser,
                            pointerEvents: modalDeleteUser ? "auto" : "none",
                        },
                    ]}>
                    <View style={styles.modalBox}>
                        <TouchableOpacity
                            style={styles.closeModal}
                            onPress={closeModalDeleteUser}>
                            <MaterialIcons
                                name="close"
                                size={20}
                                color="#EA5B0C"
                            />
                        </TouchableOpacity>

                        <View style={{width: "100%"}}>
                            <Text style={styles.labelDeleteUser}>
                                Se você deseja mesmo deletar sua conta, digite:
                                &quot;Quero deletar minha conta&quot;.
                            </Text>

                            <TextInput
                                value={messageDeleteUser}
                                onChangeText={setMessageDeleteUser}
                                style={styles.inputDeleteUser}
                                underlineColorAndroid="transparent"
                                autoCorrect={false}
                                autoCapitalize="none"
                            />
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.selectModal,
                                {
                                    backgroundColor:
                                        messageDeleteUser.toLowerCase() ===
                                        "quero deletar minha conta"
                                            ? "#EA5B0C"
                                            : "#dcdcdc",
                                },
                            ]}
                            disabled={
                                messageDeleteUser.toLowerCase() !==
                                "quero deletar minha conta"
                            }
                            onPress={deleteUser}>
                            <Text style={styles.selectModalText}>Deletar</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}

            <View style={{backgroundColor: "#FAFAFA", flex: 1}}>
                <MenuTop />

                <ScrollView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.headerButtonReturn}
                            onPress={goBackPrevPage}>
                            <MaterialIcons
                                name="keyboard-arrow-left"
                                size={20}
                                color="#FFA336"
                            />
                        </TouchableOpacity>

                        <Text style={styles.headerTitle}>Meus dados</Text>
                    </View>

                    <View style={styles.photoContainer}>
                        <View style={styles.photoBox}>
                            {avatar && (
                                <Image
                                    source={{
                                        uri: avatar,
                                    }}
                                    style={styles.photo}
                                />
                            )}
                            {!avatar && (
                                <Image
                                    source={Placeholder}
                                    style={[styles.photo, {opacity: 0.2}]}
                                />
                            )}
                            <TouchableOpacity
                                style={styles.photoButton}
                                onPress={updateImageProfile}>
                                <Text style={styles.photoButtonText}>
                                    Editar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Input
                        label="Nome Completo"
                        value={name}
                        onChange={setName}
                        colorLabel="#343A40"
                        keyboardType="default"
                    />

                    <Input
                        label="E-mail"
                        value={email}
                        onChange={setEmail}
                        colorLabel="#343A40"
                        keyboardType="email-address"
                    />

                    <View style={styles.field}>
                        <Text style={styles.label}>Telefone</Text>
                        <MaskInput
                            value={phone}
                            onChangeText={masked => setPhone(masked)}
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            autoCapitalize="none"
                            mask={Masks.BRL_PHONE}
                            keyboardType="numeric"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.buttonSubmit}
                        onPress={updateProfile}>
                        <Text style={styles.buttonSubmitText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonCancel}
                        onPress={goBackPrevPage}>
                        <Text style={styles.buttonCancelText}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonCancel}
                        onPress={openModalDeleteUser}>
                        <Text style={styles.buttonDeleteUser}>
                            Deletar conta
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

                <MenuBottom />
            </View>

            <View />
        </>
    );
}
