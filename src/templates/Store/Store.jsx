import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
    Keyboard,
    Linking,
} from "react-native";
import React, {useEffect, useMemo, useRef, useState} from "react";
import Carousel from "react-native-reanimated-carousel";
import Icons from "react-native-vector-icons/MaterialIcons";
import IconsFontAwesome from "react-native-vector-icons/FontAwesome";
import IconsFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {useDispatch, useSelector} from "react-redux";
import BottomSheet, {
    BottomSheetScrollView,
    BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import RenderHTML from "react-native-render-html";
import MenuTop from "../../components/MenuTop/MenuTop";
import MenuBottom from "../../components/MenuBottom/MenuBottom";
import styles from "./style";
import {getNavigationRedux} from "../../redux/navigation/navigationSlice";
import {selectOffer} from "../../redux/offer/offerSlice";
import {selectAuth} from "../../redux/auth/authSlice";
import Loading from "../../components/Loading/Loading";
import ModalError from "../../components/ModalError/ModalError";
import ImageUserNotFound from "../../assets/images/image-user-not-found.png";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
import {API, API_KEY} from "@env";

const stars = [
    {
        id: 0,
        name: "star",
    },
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
];

export default function Store({navigation}) {
    const [currentOffer, setCurrentOffer] = useState([]);
    const [dotsIndex, setDotsIndex] = useState(0);
    const [showRules, setShowRules] = useState(false);
    const [buyCodeUser, setBuyCodeUser] = useState("");
    const [buyCodeEnterprise, setBuyCodeEnterprise] = useState("");
    const [buyCode, setBuyCode] = useState("");
    const [canBuyOffer, setCanBuyOffer] = useState(false);
    const [avaliation, setAvaliation] = useState(0);
    const [avaliationText, setAvaliationText] = useState("");
    const [modalSuccess, setModalSuccess] = useState(false);
    const [messageModalSuccess, setMessageModalSuccess] = useState("");
    const [modalError, setModalError] = useState(false);
    const [messageModalError, setMessageModalError] = useState("");
    const [loading, setLoading] = useState(false);

    // Bottom Sheets //
    const bottomSheetAvaliations = useRef(null);
    const firstBottomSheetBuy = useRef(null);
    const secondBottomSheetBuy = useRef(null);

    const snapPointsAvaliations = useMemo(() => ["35%", "60%"], []);
    const snapPointsBuy = useMemo(() => ["51%"], []);
    const snapPointsSecondBuy = useMemo(() => ["68%"], []);

    const openBottomSheetAvaliations = () =>
        bottomSheetAvaliations.current.snapToIndex(0);

    const openBottomSheetBuy = () => firstBottomSheetBuy.current.snapToIndex(0);
    const openBottomSheetSecondBuy = () =>
        secondBottomSheetBuy.current.snapToIndex(0);

    const closeBottomSheetBuy = () => {
        Keyboard.dismiss();
        firstBottomSheetBuy.current.close();
    };

    const closeBottomSheetSecondBuy = () => {
        Keyboard.dismiss();
        navigation.navigate("Home");
        secondBottomSheetBuy.current.close();
    };

    // End Bottom Sheets //

    // Redux //

    const dispatch = useDispatch();

    const offer = useSelector(selectOffer);
    const auth = useSelector(selectAuth);

    const {width} = Dimensions.get("window");

    // Return prev page
    const {routes} = navigation.getState();
    const prevRoute = routes[routes.length - 2].name;

    const goBackPrevPage = () => {
        dispatch(getNavigationRedux(prevRoute));
        navigation.navigate(prevRoute);
    };
    // End return prev page

    // End Redux //

    // Parse HTML to React Native
    const benefits = {
        html: `${currentOffer.benefits}`,
    };
    // End Parse

    const getAvarageAvaliations = () => {
        if (currentOffer.ratings[0]) {
            const initialValue = 0;
            const allAvaliations = currentOffer.ratings.reduce(
                (acc, value) => acc + value.rating,
                initialValue,
            );

            return allAvaliations / currentOffer.ratings.length;
        }

        return 0;
    };

    const activePass = async () => {
        if (!Keyboard.isVisible()) {
            setLoading(true);

            try {
                const response = await fetch(
                    `${API}/coupons/${currentOffer.uuid}/active`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${auth.auth.userToken}`,
                            "X-DUOPASS-API-KEY": API_KEY,
                        },
                        body: JSON.stringify({
                            pass: buyCodeUser,
                        }),
                    },
                );

                const activePassResponse = await response.json();

                if (response.ok) {
                    firstBottomSheetBuy.current.close();
                    openBottomSheetSecondBuy();
                    setBuyCode("");
                    return;
                }

                setMessageModalError(activePassResponse.data.message);
                setModalError(true);

                setTimeout(() => {
                    setModalError(false);
                }, 2400);
            } catch (error) {
                console.log("Erro ao tentar ativar a oferta", error);

                setMessageModalError(
                    "Erro ao tentar ativar a oferta. Tente novamente mais tarde.",
                );
                setModalError(true);

                setTimeout(() => {
                    setModalError(false);
                }, 2400);
            } finally {
                setLoading(false);
            }

            return;
        }

        Keyboard.dismiss();
    };

    const sendAvaliation = async () => {
        setLoading(true);

        try {
            const response = await fetch(
                `${API}/coupons/${currentOffer.uuid}/ratings/store`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.auth.userToken}`,
                        "X-DUOPASS-API-KEY": API_KEY,
                    },
                    body: JSON.stringify({
                        rating: avaliation,
                        comment: avaliationText,
                        amount_paid: "",
                        amount_saved: "",
                    }),
                },
            );

            const avaliationResponse = await response.json();

            if (response.ok) {
                Keyboard.dismiss();
                setMessageModalSuccess("Oferta avaliada com sucesso!");
                setModalSuccess(true);

                setTimeout(() => {
                    navigation.navigate("Home");
                    setModalSuccess(false);
                }, 2400);

                return;
            }

            setMessageModalError(avaliationResponse.data.message);
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
        } catch (error) {
            console.log("Erro ao tentar avaliar a oferta", error);

            setMessageModalError(
                "Erro ao tentar avaliar a oferta. Tente novamente mais tarde.",
            );
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
        } finally {
            setLoading(false);
        }
    };

    const getOffer = async () => {
        setLoading(true);

        try {
            const response = await fetch(
                `${API}/coupons/${offer.offer}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.auth.userToken}`,
                        "X-DUOPASS-API-KEY": API_KEY,
                    },
                },
            );

            const offersResponse = await response.json();

            if (response.ok) {
                setCurrentOffer(offersResponse.data);
            }
        } catch (error) {
            console.log("Erro ao tentar listar oferta", error);

            setMessageModalError(
                "Erro ao tentar listar oferta. Tente novamente mais tarde.",
            );
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
        }

        if (auth.auth.userLogged) {
            try {
                const response = await fetch(`${API}/profile`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.auth.userToken}`,
                        "X-DUOPASS-API-KEY": API_KEY,
                    },
                });

                const activePassResponse = await response.json();

                if (
                    response.ok &&
                    activePassResponse.data.active_pass.verification_code
                ) {
                    setCanBuyOffer(true);
                    setBuyCodeUser(activePassResponse.data.active_pass.code);
                    setBuyCodeEnterprise(
                        activePassResponse.data.active_pass.verification_code,
                    );
                }
            } catch (error) {
                console.log(
                    "Erro ao tentar solicitar o passe do usuário",
                    error,
                );

                setMessageModalError(
                    "Erro ao tentar solicitar seu passe. Tente novamente mais tarde.",
                );
                setModalError(true);

                setTimeout(() => {
                    setModalError(false);
                }, 2400);
            } finally {
                setLoading(false);
            }

            return;
        }

        setLoading(false);
    };

    useEffect(() => {
        getOffer();
    }, []);

    return (
        <GestureHandlerRootView style={{backgroundColor: "#FAFAFA", flex: 1}}>
            <StatusBar
                backgroundColor="rgba(0,0,0,0)"
                translucent
                barStyle="light-content"
            />

            <MenuTop />

            {loading && <Loading />}

            {modalError && (
                <ModalError visible={modalError} message={messageModalError} />
            )}

            {modalSuccess && (
                <ModalSuccess
                    visible={modalSuccess}
                    message={messageModalSuccess}
                />
            )}

            <ScrollView style={{flex: 1}}>
                {currentOffer.company && (
                    <>
                        <View style={styles.banner}>
                            <TouchableOpacity
                                style={styles.buttonReturn}
                                onPress={goBackPrevPage}>
                                <Icons
                                    name="keyboard-arrow-left"
                                    size={20}
                                    color="#FFA336"
                                />
                            </TouchableOpacity>

                            <Carousel
                                style={{width: "100%"}}
                                vertical={false}
                                width={width}
                                height={350}
                                loop={false}
                                data={currentOffer.gallery}
                                scrollAnimationDuration={300}
                                onSnapToItem={index => {
                                    setDotsIndex(index);
                                }}
                                renderItem={({item}) => (
                                    <Image
                                        style={styles.bannerImage}
                                        source={{
                                            uri: `${url.urlImage}/${item.path}`,
                                        }}
                                    />
                                )}
                            />

                            <View style={styles.pagination}>
                                {currentOffer.gallery.map((item, index) => (
                                    <View
                                        style={[
                                            styles.paginationItem,
                                            {
                                                width:
                                                    index === dotsIndex
                                                        ? 30
                                                        : 10,
                                                backgroundColor:
                                                    index === dotsIndex
                                                        ? "#FFA336"
                                                        : "#D1D5DB",
                                            },
                                        ]}
                                        key={item.id}
                                    />
                                ))}
                            </View>
                        </View>

                        {/* <View style={styles.tags}>
                            <View style={{alignItems: "baseline"}}>
                                <Text
                                    style={[
                                        styles.tag,
                                        {
                                            backgroundColor: "#FFA33633",
                                            color: "#EA5B0C",
                                        },
                                    ]}>
                                    Presencial
                                </Text>
                            </View>

                            <View style={{alignItems: "baseline"}}>
                                <Text
                                    style={[
                                        styles.tag,
                                        {
                                            backgroundColor: "#9747FF33",
                                            color: "#9747FF",
                                        },
                                    ]}>
                                    Delivery
                                </Text>
                            </View>
                        </View> */}

                        <Text style={styles.title}>
                            {currentOffer.company.commercial_name}
                        </Text>

                        <View style={styles.infos}>
                            <TouchableOpacity
                                style={styles.info}
                                onPress={openBottomSheetAvaliations}>
                                <IconsFontAwesome
                                    name="star"
                                    size={16}
                                    color="#FFA336"
                                    style={{marginRight: 8}}
                                />
                                <Text
                                    style={[
                                        styles.infoText,
                                        {color: "#FFA336"},
                                    ]}>
                                    {getAvarageAvaliations()}
                                </Text>
                                <Text
                                    style={[
                                        styles.infoText,
                                        {color: "#747474"},
                                    ]}>
                                    {`(${currentOffer.ratings.length})`}
                                </Text>
                            </TouchableOpacity>
                            {/* <View style={styles.separator} />
                            <View style={[styles.info, {marginLeft: 5}]}>
                                <Icons
                                    name="people-alt"
                                    size={20}
                                    color="#EA5B0C"
                                    style={{marginRight: 8}}
                                />
                                <Text style={[styles.infoText, {color: "#343A40"}]}>
                                    2
                                </Text>
                            </View>
                            <View style={styles.separator} />
                            <View style={[styles.info, {marginLeft: 5}]}>
                                <Text style={[styles.infoText, {color: "#EA5B0C"}]}>
                                    $
                                </Text>
                                <Text style={[styles.infoText, {color: "#D1D5DB"}]}>
                                    $
                                </Text>
                                <Text style={[styles.infoText, {color: "#D1D5DB"}]}>
                                    $
                                </Text>
                            </View> */}
                        </View>

                        <View style={styles.description}>
                            <Text style={styles.descriptionText}>
                                {currentOffer.company.description}
                            </Text>
                        </View>

                        <View style={styles.buyButtonContainer}>
                            {auth.auth.userLogged && canBuyOffer && (
                                <TouchableOpacity
                                    style={styles.buyButton}
                                    onPress={openBottomSheetBuy}>
                                    <EvilIcons
                                        name="tag"
                                        size={24}
                                        color="#fff"
                                        style={{marginRight: 8}}
                                    />
                                    <Text style={styles.buyButtonText}>
                                        Utilizar oferta
                                    </Text>
                                </TouchableOpacity>
                            )}

                            {auth.auth.userLogged && !canBuyOffer && (
                                <TouchableOpacity
                                    style={styles.buyButton}
                                    onPress={() =>
                                        navigation.navigate("TypesPass")
                                    }>
                                    <EvilIcons
                                        name="tag"
                                        size={24}
                                        color="#fff"
                                        style={{marginRight: 8}}
                                    />
                                    <Text style={styles.buyButtonText}>
                                        Comprar pass
                                    </Text>
                                </TouchableOpacity>
                            )}

                            {!auth.auth.userLogged && (
                                <TouchableOpacity
                                    style={styles.buyButton}
                                    onPress={() =>
                                        navigation.navigate("Login")
                                    }>
                                    <EvilIcons
                                        name="tag"
                                        size={24}
                                        color="#fff"
                                        style={{marginRight: 8}}
                                    />
                                    <Text style={styles.buyButtonText}>
                                        Assinar agora
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.benefits}>
                            <Text style={styles.benefitsTitle}>Benefícios</Text>

                            <View style={styles.benefitsItem}>
                                <RenderHTML
                                    contentWidth={width}
                                    source={benefits}
                                    ignoredDomTags={["font"]}
                                />
                            </View>

                            <View
                                style={[
                                    styles.rules,
                                    {
                                        height: showRules ? "auto" : 50,
                                        overflow: "hidden",
                                    },
                                ]}>
                                <TouchableOpacity
                                    style={styles.rulesButton}
                                    onPress={() => setShowRules(!showRules)}>
                                    <View style={styles.rulesButtonText}>
                                        <IconsFontAwesome
                                            name="file-text-o"
                                            size={20}
                                            color="#EA5B0C"
                                            style={{marginRight: 10}}
                                        />
                                        <Text style={styles.rulesText}>
                                            Regras de uso
                                        </Text>
                                    </View>

                                    <Icons
                                        name={
                                            showRules
                                                ? "keyboard-arrow-up"
                                                : "keyboard-arrow-down"
                                        }
                                        size={20}
                                        color="#747474"
                                    />
                                </TouchableOpacity>

                                <Text style={styles.rulesDescription}>
                                    {currentOffer.usage_rules}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.localInfo}>
                            <View style={styles.localInfoHeader}>
                                <IconsFontAwesome
                                    name="map-marker"
                                    size={16}
                                    color="#EA5B0C"
                                />
                                <Text style={styles.localInfoTitle}>
                                    Endereço
                                </Text>
                            </View>

                            <Text style={styles.localInfoDescription}>
                                {currentOffer.company.address}
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    Linking.openURL(
                                        currentOffer.company.gmaps_link,
                                    )
                                }>
                                <Text style={styles.localInfoButton}>
                                    Ver no mapa
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.localInfo}>
                            <View style={styles.localInfoHeader}>
                                <IconsFontAwesome
                                    name="phone"
                                    size={16}
                                    color="#EA5B0C"
                                />
                                <Text style={styles.localInfoTitle}>
                                    Telefone
                                </Text>
                            </View>

                            <Text style={styles.localInfoDescription}>
                                {currentOffer.company.phone}
                            </Text>
                        </View>

                        <View style={styles.localInfo}>
                            <View style={styles.localInfoHeader}>
                                <IconsFontAwesome
                                    name="whatsapp"
                                    size={16}
                                    color="#EA5B0C"
                                />
                                <Text style={styles.localInfoTitle}>
                                    Whatsapp
                                </Text>
                            </View>

                            <Text style={styles.localInfoDescription}>
                                {currentOffer.company.phone}
                            </Text>
                        </View>

                        <View style={styles.calendar}>
                            <View style={styles.calendarHeader}>
                                <IconsFontAwesome
                                    name="calendar"
                                    size={16}
                                    color="#EA5B0C"
                                />
                                <Text style={styles.calendarTitle}>
                                    Calendário de utilização
                                </Text>
                            </View>

                            <View style={styles.calendarTable}>
                                <View style={styles.calendarTh}>
                                    <View style={styles.calendarColumnType} />
                                    <View>
                                        <Text style={styles.calendarText}>
                                            DOM
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.calendarText}>
                                            SEG
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.calendarText}>
                                            TER
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.calendarText}>
                                            QUA
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.calendarText}>
                                            QUI
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.calendarText}>
                                            SEX
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.calendarText}>
                                            SAB
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={[
                                        styles.calendarTh,
                                        {
                                            paddingBottom: 10,
                                            borderBottomWidth: 1,
                                            borderBottomColor: "#D1D5DB",
                                        },
                                    ]}>
                                    <View style={styles.calendarColumnType}>
                                        <Text style={styles.calendarText}>
                                            Almoço
                                        </Text>
                                    </View>
                                    <View style={styles.calendarItem}>
                                        {currentOffer.usage_info.launch_days &&
                                            currentOffer.usage_info
                                                .launch_days[0] === "1" && (
                                                <IconsFontAwesome
                                                    name="check"
                                                    size={12}
                                                    color="#EA5B0C"
                                                />
                                            )}
                                    </View>
                                    <View style={styles.calendarItem}>
                                        {currentOffer.usage_info.launch_days &&
                                            currentOffer.usage_info
                                                .launch_days[1] === "2" && (
                                                <IconsFontAwesome
                                                    name="check"
                                                    size={12}
                                                    color="#EA5B0C"
                                                />
                                            )}
                                    </View>
                                    <View style={styles.calendarItem}>
                                        {currentOffer.usage_info.launch_days &&
                                            currentOffer.usage_info
                                                .launch_days[2] === "3" && (
                                                <IconsFontAwesome
                                                    name="check"
                                                    size={12}
                                                    color="#EA5B0C"
                                                />
                                            )}
                                    </View>
                                    <View style={styles.calendarItem}>
                                        {currentOffer.usage_info.launch_days &&
                                            currentOffer.usage_info
                                                .launch_days[3] === "4" && (
                                                <IconsFontAwesome
                                                    name="check"
                                                    size={12}
                                                    color="#EA5B0C"
                                                />
                                            )}
                                    </View>
                                    <View style={styles.calendarItem}>
                                        {currentOffer.usage_info.launch_days &&
                                            currentOffer.usage_info
                                                .launch_days[4] === "5" && (
                                                <IconsFontAwesome
                                                    name="check"
                                                    size={12}
                                                    color="#EA5B0C"
                                                />
                                            )}
                                    </View>
                                    <View style={styles.calendarItem}>
                                        {currentOffer.usage_info.launch_days &&
                                            currentOffer.usage_info
                                                .launch_days[5] === "6" && (
                                                <IconsFontAwesome
                                                    name="check"
                                                    size={12}
                                                    color="#EA5B0C"
                                                />
                                            )}
                                    </View>
                                    <View style={styles.calendarItem}>
                                        {currentOffer.usage_info.launch_days &&
                                            currentOffer.usage_info
                                                .launch_days[6] === "7" && (
                                                <IconsFontAwesome
                                                    name="check"
                                                    size={12}
                                                    color="#EA5B0C"
                                                />
                                            )}
                                    </View>
                                </View>

                                <View style={styles.calendarTh}>
                                    <View style={styles.calendarColumnType}>
                                        <Text style={styles.calendarText}>
                                            Janta
                                        </Text>
                                    </View>
                                    <View style={styles.calendarItem}>
                                        {currentOffer.usage_info.dinner_days &&
                                            currentOffer.usage_info
                                                .dinner_days[0] === "1" && (
                                                <IconsFontAwesome
                                                    name="check"
                                                    size={12}
                                                    color="#EA5B0C"
                                                />
                                            )}
                                    </View>
                                    <View style={styles.calendarItem}>
                                        {currentOffer.usage_info.dinner_days &&
                                            currentOffer.usage_info
                                                .dinner_days[1] === "2" && (
                                                <IconsFontAwesome
                                                    name="check"
                                                    size={12}
                                                    color="#EA5B0C"
                                                />
                                            )}
                                    </View>
                                    <View style={styles.calendarItem}>
                                        {currentOffer.usage_info.dinner_days &&
                                            currentOffer.usage_info
                                                .dinner_days[2] === "3" && (
                                                <IconsFontAwesome
                                                    name="check"
                                                    size={12}
                                                    color="#EA5B0C"
                                                />
                                            )}
                                    </View>
                                    <View style={styles.calendarItem}>
                                        {currentOffer.usage_info.dinner_days &&
                                            currentOffer.usage_info
                                                .dinner_days[3] === "4" && (
                                                <IconsFontAwesome
                                                    name="check"
                                                    size={12}
                                                    color="#EA5B0C"
                                                />
                                            )}
                                    </View>
                                    <View style={styles.calendarItem}>
                                        {currentOffer.usage_info.dinner_days &&
                                            currentOffer.usage_info
                                                .dinner_days[4] === "5" && (
                                                <IconsFontAwesome
                                                    name="check"
                                                    size={12}
                                                    color="#EA5B0C"
                                                />
                                            )}
                                    </View>
                                    <View style={styles.calendarItem}>
                                        {currentOffer.usage_info.dinner_days &&
                                            currentOffer.usage_info
                                                .dinner_days[5] === "6" && (
                                                <IconsFontAwesome
                                                    name="check"
                                                    size={12}
                                                    color="#EA5B0C"
                                                />
                                            )}
                                    </View>
                                    <View style={styles.calendarItem}>
                                        {currentOffer.usage_info.dinner_days &&
                                            currentOffer.usage_info
                                                .dinner_days[6] === "7" && (
                                                <IconsFontAwesome
                                                    name="check"
                                                    size={12}
                                                    color="#EA5B0C"
                                                />
                                            )}
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.socials}>
                            <TouchableOpacity
                                style={styles.social}
                                onPress={() =>
                                    Linking.openURL(
                                        `instagram://${currentOffer.company.instagram}`,
                                    )
                                }>
                                <IconsFontAwesome
                                    name="instagram"
                                    size={16}
                                    color="#EA5B0C"
                                />
                                <Text style={styles.socialText}>Instagram</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.social}
                                onPress={() =>
                                    Linking.openURL(
                                        currentOffer.company.facebook,
                                    )
                                }>
                                <IconsFontAwesome
                                    name="facebook"
                                    size={16}
                                    color="#EA5B0C"
                                />
                                <Text style={styles.socialText}>Facebook</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.social}
                                onPress={() =>
                                    Linking.openURL(currentOffer.company.site)
                                }>
                                <IconsFontAwesome
                                    name="link"
                                    size={16}
                                    color="#EA5B0C"
                                />
                                <Text style={styles.socialText}>Website</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonOffer}>
                            {auth.auth.userLogged && canBuyOffer && (
                                <TouchableOpacity
                                    style={styles.buyButton}
                                    onPress={openBottomSheetBuy}>
                                    <EvilIcons
                                        name="tag"
                                        size={24}
                                        color="#fff"
                                        style={{marginRight: 8}}
                                    />
                                    <Text style={styles.buyButtonText}>
                                        Utilizar oferta
                                    </Text>
                                </TouchableOpacity>
                            )}

                            {auth.auth.userLogged && !canBuyOffer && (
                                <TouchableOpacity
                                    style={styles.buyButton}
                                    onPress={() =>
                                        navigation.navigate("TypesPass")
                                    }>
                                    <EvilIcons
                                        name="tag"
                                        size={24}
                                        color="#fff"
                                        style={{marginRight: 8}}
                                    />
                                    <Text style={styles.buyButtonText}>
                                        Comprar pass
                                    </Text>
                                </TouchableOpacity>
                            )}

                            {!auth.auth.userLogged && (
                                <TouchableOpacity
                                    style={styles.buyButton}
                                    onPress={() =>
                                        navigation.navigate("Login")
                                    }>
                                    <EvilIcons
                                        name="tag"
                                        size={24}
                                        color="#fff"
                                        style={{marginRight: 8}}
                                    />
                                    <Text style={styles.buyButtonText}>
                                        Assinar agora
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </>
                )}
            </ScrollView>
            <MenuBottom />

            <BottomSheet
                ref={bottomSheetAvaliations}
                index={-1}
                snapPoints={snapPointsAvaliations}
                enablePanDownToClose
                style={{
                    backgroundColor: "#fff",
                    borderTopRightRadius: 24,
                    borderTopLeftRadius: 24,
                }}>
                <View style={styles.filterPromo}>
                    <Text style={styles.filterPromoTitle}>Avaliações</Text>
                    {/* <Text style={styles.filterPromoSubtitle}>
                        Lorem ipsum dolor.
                    </Text> */}

                    <BottomSheetScrollView>
                        {currentOffer.company &&
                            currentOffer.ratings.map(rating => (
                                <View
                                    key={rating.id}
                                    style={styles.bottomAvaliation}>
                                    <View style={styles.avaliationHeader}>
                                        {rating.user.avatar && (
                                            <Image
                                                style={styles.avaliationImage}
                                                source={{
                                                    uri: rating.user.avatar,
                                                }}
                                            />
                                        )}

                                        {!rating.user.avatar && (
                                            <Image
                                                style={[
                                                    styles.avaliationImage,
                                                    {opacity: 0.2},
                                                ]}
                                                source={ImageUserNotFound}
                                            />
                                        )}

                                        <View>
                                            <Text
                                                style={
                                                    styles.avaliationName
                                                }>{`${
                                                rating.user.name.split(" ")[0]
                                            } ${
                                                rating.user.name.split(" ")[1]
                                            }`}</Text>

                                            <View style={styles.avaliationInfo}>
                                                <Text>{rating.date}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View
                                        style={
                                            styles.avaliationCommentContainer
                                        }>
                                        <Text style={styles.avaliationComment}>
                                            {rating.comment}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                    </BottomSheetScrollView>
                </View>
            </BottomSheet>

            {auth.auth.userLogged && (
                <BottomSheet
                    ref={firstBottomSheetBuy}
                    index={-1}
                    snapPoints={snapPointsBuy}
                    enablePanDownToClose
                    style={{
                        backgroundColor: "#fff",
                        borderTopRightRadius: 24,
                        borderTopLeftRadius: 24,
                    }}>
                    {currentOffer.company && (
                        <View style={styles.buyDrawer}>
                            <Text style={styles.buyTitle}>
                                Deseja utilizar a oferta?
                            </Text>
                            <Text style={styles.buyStore}>
                                {currentOffer.company.commercial_name}
                            </Text>
                            <Text style={styles.buyDescription}>
                                {currentOffer.title}
                            </Text>
                            <View style={styles.buyCodeContainer}>
                                <Text style={styles.buyCodeDescription}>
                                    {auth.auth &&
                                        `${auth.auth.userName.split(" ")[0]}`}
                                    , confirme seu código de ativação:
                                </Text>
                                <Text style={styles.buyCode}>
                                    {buyCodeEnterprise}
                                </Text>
                            </View>
                            <View style={styles.buyInputContainer}>
                                <BottomSheetTextInput
                                    style={styles.buyInput}
                                    value={buyCode}
                                    onChangeText={setBuyCode}
                                    underlineColorAndroid="transparent"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    keyboardType="numeric"
                                />
                                <IconsFontAwesome5
                                    name="key"
                                    size={20}
                                    color="#EA5B0C"
                                    style={styles.buyIcon}
                                />
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.buyCodeButton,
                                    {
                                        backgroundColor:
                                            buyCode ===
                                            String(buyCodeEnterprise)
                                                ? "#EA5B0C"
                                                : "#D1D5DB",
                                    },
                                ]}
                                onPress={activePass}>
                                <Text style={styles.buyCodeButtonText}>
                                    Ativar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.buyCodeButton,
                                    {
                                        backgroundColor: "transparent",
                                        marginTop: 10,
                                    },
                                ]}
                                onPress={closeBottomSheetBuy}>
                                <Text
                                    style={[
                                        styles.buyCodeButtonText,
                                        {color: "#747474"},
                                    ]}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </BottomSheet>
            )}

            {auth.auth.userLogged && (
                <BottomSheet
                    ref={secondBottomSheetBuy}
                    index={-1}
                    snapPoints={snapPointsSecondBuy}
                    enablePanDownToClose
                    style={{
                        backgroundColor: "#fff",
                        borderTopRightRadius: 24,
                        borderTopLeftRadius: 24,
                    }}>
                    {currentOffer.company && (
                        <View style={styles.buyDrawer}>
                            <Text style={styles.buyStore}>
                                Detalhes do cupom
                            </Text>
                            <Text style={styles.buyTitle}>
                                {currentOffer.company.commercial_name}
                            </Text>

                            <View style={styles.buySuccessMessage}>
                                <Text style={styles.buySuccessMessageTitle}>
                                    Parabéns
                                </Text>
                                <Text
                                    style={styles.buySuccessMessageDescription}>
                                    Oferta utilizada com sucesso.
                                </Text>
                            </View>

                            {/* <View style={styles.values}>
                                <View
                                    style={[
                                        styles.valuesItem,
                                        {
                                            marginBottom: 10,
                                            paddingBottom: 10,
                                            borderBottomWidth: 1,
                                            borderBottomColor: "#D1D5DB",
                                        },
                                    ]}>
                                    <Text style={styles.valuesTitle}>
                                        Valor pago
                                    </Text>
                                    <Text style={styles.valuesValue}>
                                        R$ 145,90
                                    </Text>
                                </View>

                                <View style={styles.valuesItem}>
                                    <Text style={styles.valuesTitle}>
                                        Valor economizado
                                    </Text>
                                    <Text style={styles.valuesValue}>
                                        R$ 95,00
                                    </Text>
                                </View>
                            </View> */}

                            <View style={styles.avaliation}>
                                <Text style={styles.avaliationTitle}>
                                    Avaliação
                                </Text>

                                <View style={styles.avaliationStars}>
                                    {stars.map(star => (
                                        <TouchableOpacity
                                            key={star.id}
                                            style={{marginLeft: 4}}
                                            onPress={() =>
                                                setAvaliation(star.id)
                                            }>
                                            <IconsFontAwesome
                                                name={star.name}
                                                size={16}
                                                color={
                                                    star.id <= avaliation
                                                        ? "#FFA336"
                                                        : "#D1D5DB"
                                                }
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* <View style={styles.avaliation}>
                                <Text style={styles.avaliationTitle}>
                                    Atendimento
                                </Text>

                                <View style={styles.avaliationStars}>
                                    {stars.map(star => (
                                        <TouchableOpacity
                                            key={star.id}
                                            style={{marginLeft: 4}}
                                            onPress={() =>
                                                setAvaliationService(star.id)
                                            }>
                                            <IconsFontAwesome
                                                name={star.name}
                                                size={16}
                                                color={
                                                    star.id <= avaliationService
                                                        ? "#FFA336"
                                                        : "#D1D5DB"
                                                }
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.avaliation}>
                                <Text style={styles.avaliationTitle}>
                                    Tempo de espera
                                </Text>

                                <View style={styles.avaliationStars}>
                                    {stars.map(star => (
                                        <TouchableOpacity
                                            key={star.id}
                                            style={{marginLeft: 4}}
                                            onPress={() =>
                                                setAvaliationTime(star.id)
                                            }>
                                            <IconsFontAwesome
                                                name={star.name}
                                                size={16}
                                                color={
                                                    star.id <= avaliationTime
                                                        ? "#FFA336"
                                                        : "#D1D5DB"
                                                }
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View> */}

                            <Text style={styles.avaliationLabel}>
                                Deixe um comentário
                            </Text>
                            <BottomSheetTextInput
                                style={styles.avaliationText}
                                value={avaliationText}
                                onChangeText={setAvaliationText}
                                underlineColorAndroid="transparent"
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="default"
                                multiline
                                numberOfLines={4}
                            />

                            <TouchableOpacity
                                style={[
                                    styles.buyCodeButton,
                                    {
                                        backgroundColor: "#EA5B0C",
                                    },
                                ]}
                                onPress={sendAvaliation}>
                                <Text style={styles.buyCodeButtonText}>
                                    Avaliar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.buyCodeButton,
                                    {
                                        backgroundColor: "transparent",
                                        marginTop: 10,
                                    },
                                ]}
                                onPress={closeBottomSheetSecondBuy}>
                                <Text
                                    style={[
                                        styles.buyCodeButtonText,
                                        {color: "#747474"},
                                    ]}>
                                    Fechar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </BottomSheet>
            )}
        </GestureHandlerRootView>
    );
}
