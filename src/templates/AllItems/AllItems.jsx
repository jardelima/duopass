import React, {useEffect, useMemo, useRef, useState} from "react";
import {
    Animated,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    View,
} from "react-native";
import {Text} from "react-native-paper";
import Icons from "react-native-vector-icons/MaterialIcons";
import {useDispatch, useSelector} from "react-redux";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import MenuTop from "../../components/MenuTop/MenuTop";
import MenuBottom from "../../components/MenuBottom/MenuBottom";
import styles from "./style";
import FilterStatesAndCity from "../../components/FilterStatesAndCity/FilterStatesAndCity";
import ModalError from "../../components/ModalError/ModalError";
import Loading from "../../components/Loading/Loading";
import {selectLocation} from "../../redux/location/locationSlice";
import {getOfferRedux} from "../../redux/offer/offerSlice";
import {getFilterRedux, selectFilter} from "../../redux/filter/filterSlice";
import {API, API_KEY} from "@env";

export default function AllItems({navigation}) {
    const [offers, setOffers] = useState([]);
    const [category, setCategory] = useState(null);
    const [modalError, setModalError] = useState(false);
    const [messageModalError, setMessageModalError] = useState("");
    const [loading, setLoading] = useState(false);
    const [allCategories, setAllCategories] = useState([]);
    const [modalSelect, setModalSelect] = useState(false);

    const fadeModal = useRef(new Animated.Value(0)).current;

    const location = useSelector(selectLocation);
    const filter = useSelector(selectFilter);

    const dispatch = useDispatch();

    // Bottom Sheets //
    const bottomSheetFilter = useRef(null);

    const snapPointsFilter = useMemo(() => ["45%"], []);

    const openBottomSheetFilter = () => {
        bottomSheetFilter.current.snapToIndex(0);
    };

    const closeBottomSheetFilter = () => {
        bottomSheetFilter.current.close();
    };

    const clearFilter = () => {
        dispatch(getFilterRedux({category: ""}));
        setCategory(null);
    };
    // End Bottom Sheets //

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

    const selectedFilter = () => {
        dispatch(getFilterRedux({category}));
        closeBottomSheetFilter();
        navigation.navigate("AllItems");
    };

    const getOffers = async () => {
        let locationSelected = "";

        if (location.location) {
            locationSelected = location.location.split("/")[1].replace(" ", "");
        }

        setLoading(true);

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

            if (response.ok && filter.filter.category !== "") {
                const offersFiltered = offersResponse.data.filter(
                    item => item.category.name === filter.filter.category,
                );
                setOffers(offersFiltered);
                return;
            }

            if (response.ok && filter.filter.category === "") {
                setOffers(offersResponse.data);
            }
        } catch (error) {
            console.log("Erro ao tentar listar as ofertas", error);

            setMessageModalError(
                "Erro ao tentar listar as ofertas. Tente novamente mais tarde.",
            );
            setModalError(true);
            setLoading(false);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
        } finally {
            setLoading(false);
        }
    };

    const getCategoriesFilter = async () => {
        let locationSelected = "";

        if (location.location) {
            locationSelected = location.location.split("/")[1].replace(" ", "");
        }

        setLoading(true);

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

    const handleItem = id => {
        dispatch(getOfferRedux(id));
        navigation.navigate("Store");
    };

    useEffect(() => {
        getOffers();
    }, [filter.filter.category]);

    useEffect(() => {
        getCategoriesFilter();
    }, []);

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

            {loading && <Loading />}

            {modalError && (
                <ModalError visible={modalError} message={messageModalError} />
            )}

            {modalError && (
                <ModalError
                    visible={modalError}
                    message="Selecione a categoria"
                />
            )}

            <GestureHandlerRootView
                style={{backgroundColor: "#FAFAFA", flex: 1}}>
                <MenuTop />

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

                    {filter.filter.category !== "" && (
                        <View style={{paddingHorizontal: 20}}>
                            <Text style={styles.filterCategory}>
                                <Text style={styles.filterCategoryText}>
                                    {filter.filter.category}
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        transform: [{translateY: 4}],
                                    }}
                                    onPress={() =>
                                        dispatch(getFilterRedux({category: ""}))
                                    }>
                                    <Icons
                                        name="close"
                                        size={16}
                                        color="#ea5b0c"
                                    />
                                </TouchableOpacity>
                            </Text>
                        </View>
                    )}

                    <View style={{paddingHorizontal: 20}}>
                        <Text style={styles.title}>Ofertas disponíveis</Text>

                        {offers.length > 0 &&
                            offers.map(offer => (
                                <TouchableOpacity
                                    key={offer.uuid}
                                    style={styles.box}
                                    onPress={() => handleItem(offer.uuid)}>
                                    <View style={styles.boxDescription}>
                                        <Text style={styles.boxTitle}>
                                            {offer.title}
                                        </Text>
                                        <Text style={styles.boxInfo}>
                                            {offer.description}
                                        </Text>
                                        <Text style={styles.boxLocal}>
                                            {offer.city.name} -{" "}
                                            {offer.city.state}
                                        </Text>
                                    </View>

                                    <Image
                                        style={styles.boxImage}
                                        source={{
                                            uri: offer.featured_image,
                                        }}
                                    />
                                </TouchableOpacity>
                            ))}

                        {offers.length === 0 && !loading && (
                            <Text style={styles.warningMessage}>
                                Não há ofertas disponíveis
                            </Text>
                        )}
                    </View>
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
                    {/* <Text style={styles.filterPromoSubtitle}>
                        Lorem ipsum dolor.
                    </Text> */}

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
                            Selecionar
                        </Text>
                    </TouchableOpacity>

                    {filter.filter.category !== "" && (
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
