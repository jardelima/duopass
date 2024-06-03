import {
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, {useEffect, useState} from "react";
import IconsFeather from "react-native-vector-icons/Feather";
import {useDispatch} from "react-redux";
import MenuTop from "../../components/MenuTop/MenuTop";
import MenuBottom from "../../components/MenuBottom/MenuBottom";
import styles from "./style";
import HeaderTitleAndReturn from "../../components/HeaderTitleAndReturn/HeaderTitleAndReturn";
import {getTypePassRedux} from "../../redux/typePass/typePassSlice";
import {getNavigationRedux} from "../../redux/navigation/navigationSlice";
import Loading from "../../components/Loading/Loading";
import {API, API_KEY} from "@env";

export default function TypesPass({navigation}) {
    const [typesPass, setTypesPass] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const toSign = (passId, passTitle, passPrice, passDescription) => {
        dispatch(
            getTypePassRedux({
                passId,
                passTitle,
                passPrice,
                passDescription,
            }),
        );

        dispatch(getNavigationRedux("Buy"));
        navigation.navigate("Buy");
    };

    const getTypesPass = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${API}/passes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-DUOPASS-API-KEY": API_KEY,
                },
            });

            const typePassResponse = await response.json();

            if (response.ok) {
                setTypesPass(typePassResponse.data);
            }
        } catch (error) {
            console.log("Erro ao tentar pegar os tipos de passes", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTypesPass();
    }, []);

    return (
        <>
            <StatusBar
                backgroundColor="rgba(0,0,0,0)"
                translucent
                barStyle="light-content"
            />
            <MenuTop />

            {loading && <Loading />}

            <ScrollView style={styles.container}>
                <HeaderTitleAndReturn title="Tipos de passes" />

                <Text style={styles.description}>
                    Esses são os tipos de passes disponíveis. Escolha o que você
                    preferir.
                </Text>

                {typesPass &&
                    typesPass.map(pass => (
                        <View key={pass.id} style={styles.passBox}>
                            <Text style={styles.passTitle}>{pass.title}</Text>
                            <Text style={styles.passPriceDescription}>
                                preço: {pass.price}
                            </Text>
                            <Text style={styles.passDescription}>
                                {pass.description}
                            </Text>
                            <TouchableOpacity
                                style={styles.passButton}
                                onPress={() =>
                                    toSign(
                                        pass.id,
                                        pass.title,
                                        pass.price,
                                        pass.description,
                                    )
                                }>
                                <IconsFeather
                                    name="shopping-cart"
                                    size={16}
                                    color="#fff"
                                />
                                <Text style={styles.passButtonText}>
                                    Assinar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
            </ScrollView>

            <MenuBottom />
        </>
    );
}
