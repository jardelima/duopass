import React, {useEffect, useMemo, useRef, useState} from "react";
import {
    Text,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialIcons";
import {useDispatch} from "react-redux";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import MenuTop from "../../components/MenuTop/MenuTop";
import MenuBottom from "../../components/MenuBottom/MenuBottom";
import styles from "./style";
import {getLocationRedux} from "../../redux/location/locationSlice";
import ModalError from "../../components/ModalError/ModalError";

const selectStates = [{label: "Ceará", value: "ce", key: 0}];

const selectCitys = [
    {
        state: "ce",
        items: [
            {label: "Jericoacoara", value: "jericoacoara", key: 0},
            {label: "Praia do Préa", value: "praia do prea", key: 1},
        ],
    },
];

export default function FilterStatesAndCity({navigation}) {
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [citys, setCitys] = useState([]);
    const [modalError, setModalError] = useState(false);

    // Bottom Sheets //
    const bottomSheetFilter = useRef(null);

    const snapPointsFilter = useMemo(() => ["45%"], []);

    const openBottomSheetFilter = item => {
        bottomSheetFilter.current.snapToIndex(0);
        setState(item);
    };

    const closeBottomSheetFilter = () => {
        bottomSheetFilter.current.close();
        setCity("");
    };
    // End Bottom Sheets //

    const dispatch = useDispatch();

    const handleButtonFilterCity = () => {
        const stateAndCity = `${city.charAt(0).toUpperCase()}${city.slice(
            1,
        )} / ${state.toUpperCase()}`;

        if (city === "") {
            setTimeout(() => {
                setModalError(true);
            }, 200);

            setTimeout(() => {
                setModalError(false);
            }, 2400);

            return;
        }

        closeBottomSheetFilter();

        setTimeout(() => {
            dispatch(getLocationRedux(stateAndCity));
            navigation.navigate("Home");
        }, 200);
    };

    const getCitysOfTheState = () => {
        selectCitys.forEach(
            cityOftTheStates =>
                cityOftTheStates.state === state &&
                setCitys(cityOftTheStates.items),
        );
    };

    useEffect(() => {
        getCitysOfTheState();
    }, [state]);

    return (
        <GestureHandlerRootView style={{flex: 1, backgroundColor: "#FAFAFA"}}>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="rgba(0,0,0,0)"
            />

            <MenuTop />

            {modalError && (
                <ModalError
                    visible={modalError}
                    message="Selecione uma cidade"
                />
            )}

            <ScrollView style={{flex: 1}}>
                {selectStates.map(stateItem => (
                    <TouchableOpacity
                        key={stateItem.key}
                        style={styles.filterStates}
                        onPress={() => openBottomSheetFilter(stateItem.value)}>
                        <Text style={styles.filterStatesText}>
                            {stateItem.label}
                        </Text>
                        <Icons
                            name="arrow-forward-ios"
                            size={16}
                            color="#FFA336"
                        />
                    </TouchableOpacity>
                ))}
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
                <Text style={styles.filterCityTitle}>Filtros</Text>
                <Text style={styles.filterCitySubtitle}>
                    Selecione a cidade pela qual deseja filtrar
                </Text>

                <View>
                    {citys.map(cityItem => (
                        <TouchableOpacity
                            key={cityItem.key}
                            style={[
                                styles.filterCityButton,
                                {
                                    borderColor:
                                        city === cityItem.value
                                            ? "#FFA336"
                                            : "rgba(0,0,0,0.1)",
                                    borderWidth:
                                        city === cityItem.value ? 2 : 0.5,
                                    shadowColor:
                                        city === cityItem.value
                                            ? "#FFA336"
                                            : "#000",
                                },
                            ]}
                            onPress={() => setCity(cityItem.value)}>
                            <Text style={styles.filterCityButtonText}>
                                {cityItem.label}
                            </Text>
                            <Icons
                                name="check-circle"
                                size={20}
                                color={
                                    city === cityItem.value ? "#FFA336" : "#fff"
                                }
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.filterSelectCity}
                    onPress={handleButtonFilterCity}>
                    <Text style={styles.filterSelectCityText}>Selecionar</Text>
                </TouchableOpacity>
            </BottomSheet>
        </GestureHandlerRootView>
    );
}
