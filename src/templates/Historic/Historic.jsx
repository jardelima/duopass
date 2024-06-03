import {
    View,
    Text,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Image,
} from "react-native";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {useSelector} from "react-redux";
import IconsFontAwesome from "react-native-vector-icons/FontAwesome";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import MenuTop from "../../components/MenuTop/MenuTop";
import MenuBottom from "../../components/MenuBottom/MenuBottom";
import HeaderTitleAndReturn from "../../components/HeaderTitleAndReturn/HeaderTitleAndReturn";
import styles from "./style";
import Loading from "../../components/Loading/Loading";
import {selectAuth} from "../../redux/auth/authSlice";
import ModalError from "../../components/ModalError/ModalError";
import {API, API_KEY} from "@env";

const stars = [
    {
        id: 1,
        name: "star",
    },
    {
        id: 2,
        name: "star",
    },
    {
        id: 3,
        name: "star",
    },
    {
        id: 4,
        name: "star",
    },
    {
        id: 5,
        name: "star",
    },
];

export default function Historic() {
    const [passCode, setPassCode] = useState("");
    const [passExpiration, setPassExpiration] = useState("");
    const [amountSaved, setAmountSaved] = useState("");
    const [historic, setHistoric] = useState([]);
    const [avaliations, setAvaliations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [messageModalError, setMessageModalError] = useState("");

    const [currentAvaliation, setCurrentAvaliation] = useState();

    const auth = useSelector(selectAuth);

    // Bottom Sheets //
    const bottomSheetFilter = useRef(null);

    const snapPointsFilter = useMemo(() => ["40%"], []);

    const openBottomSheetFilter = item => {
        setCurrentAvaliation(item);
        bottomSheetFilter.current.snapToIndex(0);
    };
    // End Bottom Sheets //

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
                setPassCode(profileResponse.data.active_pass.verification_code);
                setPassExpiration(
                    profileResponse.data.active_pass.expiration_date,
                );
                setAmountSaved(profileResponse.data.amount_saved);
                setHistoric(profileResponse.data.historic);
                setAvaliations(profileResponse.data.ratings);
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

    const clearPassExpiration = () => {
        let dateExpiration = "";

        if (passExpiration) {
            const date = passExpiration.split(" ")[0].split("-");

            dateExpiration = `${date[2]}/${date[1]}/${date[0]}`;
        }

        return dateExpiration;
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <GestureHandlerRootView style={{backgroundColor: "#FAFAFA", flex: 1}}>
            <StatusBar
                backgroundColor="rgba(0,0,0,0)"
                barStyle="light-content"
                translucent
            />

            <MenuTop />

            {modalError && (
                <ModalError visible={modalError} message={messageModalError} />
            )}

            {loading && <Loading />}

            <ScrollView style={styles.container}>
                <HeaderTitleAndReturn title="Utilização e histórico" />

                <View style={styles.economyBox}>
                    <Text style={styles.economyDescription}>
                        Você já economizou
                    </Text>
                    <Text style={styles.economy}>R$ {amountSaved}</Text>
                </View>

                <Text style={styles.titleBox}>Passes disponíveis</Text>

                {passCode ? (
                    <View style={styles.box}>
                        <Text style={styles.passQtd}>Passe #01</Text>

                        <View style={styles.passCodeContainer}>
                            <Text style={styles.passCodeTitle}>
                                Código do passe:
                            </Text>
                            <Text style={styles.passCode}>{passCode}</Text>
                        </View>

                        <Text style={styles.passCodeDate}>
                            Expira em: {clearPassExpiration()} às{" "}
                            {passExpiration && passExpiration.split(" ")[1]}
                        </Text>
                    </View>
                ) : (
                    <Text style={styles.warningMessage}>
                        Você ainda não tem um passe
                    </Text>
                )}

                <Text style={styles.titleBox}>Histórico</Text>

                {historic.length > 0 &&
                    historic.reverse().map(item => (
                        <View key={item.id} style={{marginBottom: 10}}>
                            <Text style={styles.historicTitle}>
                                Histórico do passe comprado em:{" "}
                                <Text style={styles.historicTitleBold}>
                                    {item.created_at.split(" ")[0]}
                                </Text>
                            </Text>

                            {item.activations.map(pass => (
                                <View key={pass.hour} style={styles.box}>
                                    <Text style={styles.passQtd}>
                                        {pass.company}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.passCodeTitle,
                                            {marginBottom: 10},
                                        ]}>
                                        {pass.coupon}
                                    </Text>
                                    <Text style={styles.passCodeDate}>
                                        {pass.date}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    ))}

                {historic.length === 0 && (
                    <Text style={styles.warningMessage}>
                        Não existe histórico no momento
                    </Text>
                )}

                <Text style={styles.titleBox}>Avaliações</Text>

                {avaliations.length > 0 &&
                    avaliations.map(avaliation => (
                        <View key={avaliation.id} style={styles.box}>
                            <View>
                                <Text style={styles.passQtd}>
                                    {avaliation.coupon.company}
                                </Text>
                                <Text
                                    style={[
                                        styles.passCodeTitle,
                                        {marginBottom: 10},
                                    ]}>
                                    {avaliation.coupon.title}
                                </Text>
                                <Text style={styles.passCodeDate}>
                                    {avaliation.date}
                                </Text>

                                <TouchableOpacity
                                    onPress={() =>
                                        openBottomSheetFilter(avaliation)
                                    }
                                    style={styles.buttonAvaliation}>
                                    <Text style={styles.buttonAvaliationText}>
                                        Ver avaliação
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                {avaliations.length === 0 && (
                    <Text style={styles.warningMessage}>
                        Não existe avaliações no momento
                    </Text>
                )}
            </ScrollView>

            <MenuBottom />

            <BottomSheet
                ref={bottomSheetFilter}
                index={-1}
                snapPoints={snapPointsFilter}
                enablePanDownToClose
                style={{
                    backgroundColor: "#fff",
                    borderTopRightRadius: 24,
                    borderTopLeftRadius: 24,
                    paddingHorizontal: 20,
                }}>
                {currentAvaliation && (
                    <View>
                        <Text style={styles.filterPromoTitle}>Avaliação</Text>
                        {/* <Text style={styles.filterPromoSubtitle}>
                        Lorem ipsum dolor.
                    </Text> */}

                        <View>
                            <View style={styles.avaliationHeader}>
                                <Image
                                    style={styles.avaliationImage}
                                    source={{
                                        uri: currentAvaliation.user.avatar,
                                    }}
                                />

                                <View>
                                    <Text style={styles.avaliationName}>{`${
                                        currentAvaliation.user.name.split(
                                            " ",
                                        )[0]
                                    } ${
                                        currentAvaliation.user.name.split(
                                            " ",
                                        )[1]
                                    }`}</Text>

                                    <View style={styles.avaliationInfo}>
                                        <View style={styles.avaliationStars}>
                                            {stars.map(star => (
                                                <TouchableOpacity
                                                    key={star.id}
                                                    style={{marginRight: 8}}>
                                                    <IconsFontAwesome
                                                        name={star.name}
                                                        size={16}
                                                        color={
                                                            star.id <=
                                                            currentAvaliation.rating
                                                                ? "#FFA336"
                                                                : "#D1D5DB"
                                                        }
                                                    />
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                        <Text>{currentAvaliation.date}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.avaliationCommentContainer}>
                                <Text style={styles.avaliationComment}>
                                    {currentAvaliation.comment}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            </BottomSheet>
        </GestureHandlerRootView>
    );
}
