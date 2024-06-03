import React, {useEffect, useMemo, useRef, useState} from "react";
import {
    Animated,
    Dimensions,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    View,
} from "react-native";
import {Text} from "react-native-paper";
import Icons from "react-native-vector-icons/MaterialIcons";
import Carousel from "react-native-reanimated-carousel";
import {useDispatch, useSelector} from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import MenuTop from "../../components/MenuTop/MenuTop";
import MenuBottom from "../../components/MenuBottom/MenuBottom";
import styles from "./style";
import FilterStatesAndCity from "../../components/FilterStatesAndCity/FilterStatesAndCity";
import ModalError from "../../components/ModalError/ModalError";
import CardItem from "../../components/CardItem/CardItem";
import CardContainer from "../../components/CardContainer/CardContainer";
import Loading from "../../components/Loading/Loading";
import {selectLocation} from "../../redux/location/locationSlice";
import {getFilterRedux, selectFilter} from "../../redux/filter/filterSlice";
import {API, API_KEY} from "@env";

export default function Home({navigation}) {
    const [offers, setOffers] = useState([]);
    const [featuredOffers, setFeaturedOffers] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [modalError, setModalError] = useState(false);
    const [firstDots, setFirstDots] = useState(0);
    const [secondDots, setSecondDots] = useState(0);
    const [loading, setLoading] = useState(false);
    const [messageModalError, setMessageModalError] = useState("");
    const [modalSelect, setModalSelect] = useState(false);

    const fadeModal = useRef(new Animated.Value(0)).current;

    // Bottom Sheets //
    const bottomSheetFilter = useRef(null);

    const snapPointsFilter = useMemo(() => ["45%"], []);

    const openBottomSheetFilter = () => {
        bottomSheetFilter.current.snapToIndex(0);
    };

    const closeBottomSheetFilter = () => {
        bottomSheetFilter.current.close();
    };
    // End Bottom Sheets //

    const {width} = Dimensions.get("window");

    const location = useSelector(selectLocation);
    const filter = useSelector(selectFilter);

    const dispatch = useDispatch();

    const selectedFilter = () => {
        dispatch(getFilterRedux({category}));
        closeBottomSheetFilter();
        navigation.navigate("AllItems");
    };

    const clearFilter = () => {
        dispatch(getFilterRedux({category: ""}));
        setCategory(null);
        closeBottomSheetFilter();
    };

    const openModal = () => {
        setModalSelect(true);

        Animated.timing(fadeModal, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        setModalSelect(false);
        setCategory(null);

        Animated.timing(fadeModal, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const finishModal = () => {
        setModalSelect(false);

        Animated.timing(fadeModal, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const getOffers = async () => {
        let locationSelected = "";

        if (location.location) {
            locationSelected = location.location.split("/")[1].replace(" ", "");
        }

        setLoading(true);

        try {
            const response = await fetch(
                `${API}/coupons/featured?state=${locationSelected}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-DUOPASS-API-KEY": API_KEY,
                    },
                },
            );

            const featuredOffersResponse = await response.json();

            if (response.ok) {
                setFeaturedOffers(featuredOffersResponse.data);
            }
        } catch (error) {
            setLoading(false);
            console.log("Erro ao tentar listar as ofertas destaques", error);

            setMessageModalError(
                "Erro ao tentar listar as ofertas. Tente novamente mais tarde.",
            );
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
        }

        try {
            const response = await fetch(
                `${API}/coupons?state=${locationSelected}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-DUOPASS-API-KEY": API_KEY,
                    },
                },
            );

            const offersResponse = await response.json();

            if (response.ok) {
                setOffers(offersResponse.data);

                offersResponse.data.forEach(offer => {
                    if (offer.category.name) {
                        setAllCategories(prev => [
                            ...prev,
                            {
                                key: offer.category.id,
                                label: offer.category.name,
                                value: offer.category.name,
                            },
                        ]);
                    }
                });
            }
        } catch (error) {
            console.log("Erro ao tentar listar as ofertas", error);

            setMessageModalError(
                "Erro ao tentar listar as ofertas. Tente novamente mais tarde.",
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
        getOffers();
    }, [location.location]);

    const notDuplicatedCategories = allCategories
        .map(item => item.key)
        .map((item, index, arr) => arr.indexOf(item) === index && index)
        .filter(item => allCategories[item])
        .map(item => allCategories[item]);

    return (
        <>
            <StatusBar
                backgroundColor="rgba(0,0,0,0)"
                barStyle="light-content"
                translucent
            />

            {modalSelect && (
                <Animated.View
                    style={[
                        styles.modalContainer,
                        {
                            opacity: fadeModal,
                            pointerEvents: modalSelect ? "auto" : "none",
                        },
                    ]}>
                    <View style={styles.modalBox}>
                        <TouchableOpacity
                            style={styles.closeModal}
                            onPress={closeModal}>
                            <Icons name="close" size={20} color="#EA5B0C" />
                        </TouchableOpacity>

                        <ScrollView style={{marginVertical: 25}}>
                            {notDuplicatedCategories.map(type => (
                                <TouchableOpacity
                                    key={type.key}
                                    style={[
                                        styles.selectOptionItem,
                                        {
                                            borderColor:
                                                category === type.value
                                                    ? "#FFA336"
                                                    : "rgba(0,0,0,0.1)",
                                            borderWidth:
                                                category === type.value
                                                    ? 2
                                                    : 0.5,
                                            shadowColor:
                                                category === type.value
                                                    ? "#FFA336"
                                                    : "#000",
                                        },
                                    ]}
                                    onPress={() => setCategory(type.value)}>
                                    <Text style={styles.filterCityButtonText}>
                                        {type.label}
                                    </Text>
                                    <Icons
                                        name="check-circle"
                                        size={20}
                                        color={
                                            category === type.value
                                                ? "#FFA336"
                                                : "#fff"
                                        }
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <TouchableOpacity
                            style={styles.selectModal}
                            onPress={finishModal}>
                            <Text style={styles.selectModalText}>
                                Selecionar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}

            <GestureHandlerRootView
                style={{backgroundColor: "#FAFAFA", flex: 1}}>
                <MenuTop />

                {modalError && (
                    <ModalError
                        visible={modalError}
                        message={messageModalError}
                    />
                )}

                {loading && <Loading />}

                <ScrollView style={{flex: 1}}>
                    <View style={styles.filterContainer}>
                        <FilterStatesAndCity />
                        <TouchableOpacity
                            style={styles.filter}
                            onPress={openBottomSheetFilter}>
                            <Icons name="filter-list" size={24} color="#fff" />

                            {filter.filter.category !== "" && (
                                <View style={styles.filterQtd}>
                                    <Text style={styles.filterText}>1</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>

                    <CardContainer
                        title="Destaques"
                        items={offers.length}
                        navigate="AllItems">
                        {!loading && featuredOffers.length === 0 && (
                            <Text style={styles.warningMessage}>
                                Não existem ofertas disponíveis
                            </Text>
                        )}

                        <Carousel
                            style={{width: "100%"}}
                            loop={false}
                            vertical={false}
                            width={width * 0.65}
                            height={featuredOffers.length > 0 ? 350 : 100}
                            data={featuredOffers.slice(0, 5)}
                            scrollAnimationDuration={300}
                            onSnapToItem={index => {
                                setSecondDots(index);
                            }}
                            renderItem={({item}) => (
                                <CardItem
                                    key={item.uuid}
                                    image={
                                        item.featured_image
                                            ? item.featured_image
                                            : false
                                    }
                                    title={item.title}
                                    description={item.description}
                                    tag={item.tagNew && true}
                                    navigate="Store"
                                    offerId={item.uuid}
                                />
                            )}
                        />

                        <View style={styles.pagination}>
                            {featuredOffers.slice(0, 5).map((item, index) => (
                                <Animated.View
                                    style={[
                                        styles.paginationItem,
                                        {
                                            width:
                                                index === secondDots ? 30 : 10,
                                            backgroundColor:
                                                index === secondDots
                                                    ? "#FFA336"
                                                    : "#D1D5DB",
                                        },
                                    ]}
                                    key={item.uuid}
                                />
                            ))}
                        </View>
                    </CardContainer>

                    <CardContainer
                        title="Ofertas disponíveis"
                        items={offers.length}
                        navigate="AllItems">
                        {!loading && offers.length === 0 && (
                            <Text style={styles.warningMessage}>
                                Não existem ofertas disponíveis
                            </Text>
                        )}

                        <Carousel
                            style={{width: "100%"}}
                            vertical={false}
                            loop={false}
                            width={width * 0.65}
                            height={offers.length > 0 ? 350 : 100}
                            data={offers.slice(0, 5)}
                            scrollAnimationDuration={300}
                            onSnapToItem={index => {
                                setFirstDots(index);
                            }}
                            renderItem={({item}) => (
                                <CardItem
                                    key={item.uuid}
                                    image={
                                        item.featured_image
                                            ? item.featured_image
                                            : false
                                    }
                                    title={item.title}
                                    description={item.description}
                                    tag={item.tagNew && true}
                                    navigate="Store"
                                    offerId={item.uuid}
                                />
                            )}
                        />

                        <View style={styles.pagination}>
                            {offers.slice(0, 5).map((item, index) => (
                                <View
                                    style={[
                                        styles.paginationItem,
                                        {
                                            width:
                                                index === firstDots ? 30 : 10,
                                            backgroundColor:
                                                index === firstDots
                                                    ? "#FFA336"
                                                    : "#D1D5DB",
                                        },
                                    ]}
                                    key={item.uuid}
                                />
                            ))}
                        </View>
                    </CardContainer>
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
                    <Text style={styles.filterPromoTitle}>Filtros</Text>
                    <Text style={styles.filterPromoSubtitle}>
                        Selecione a categoria pela qual deseja filtrar
                    </Text>

                    <View>
                        <Text style={styles.label}>Categoria</Text>
                        <View style={styles.pickerContainer}>
                            <TouchableOpacity
                                style={styles.pickerInput}
                                onPress={openModal}>
                                <Text
                                    style={[
                                        styles.pickerPlaceholder,
                                        {
                                            color: category
                                                ? "#343A40"
                                                : "rgba(0,0,0,0.4)",
                                        },
                                    ]}>
                                    {!category
                                        ? "Selecione uma categoria"
                                        : category
                                              .charAt(0)
                                              .toLocaleUpperCase() +
                                          category.substring(1)}
                                </Text>
                                <Icons
                                    name="keyboard-arrow-down"
                                    size={16}
                                    color="rgba(0,0,0,0.6)"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.filterSelectPromo}
                        onPress={selectedFilter}>
                        <Text style={styles.filterSelectPromoText}>
                            Filtrar
                        </Text>
                    </TouchableOpacity>

                    {category && (
                        <TouchableOpacity
                            style={styles.cleanFilterPromo}
                            onPress={clearFilter}>
                            <Text style={styles.cleanFilterPromoText}>
                                Limpar filtro
                            </Text>
                        </TouchableOpacity>
                    )}
                </BottomSheet>
            </GestureHandlerRootView>
        </>
    );
}
