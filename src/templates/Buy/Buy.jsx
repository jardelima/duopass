import {
    Text,
    View,
    TouchableOpacity,
    Keyboard,
    Pressable,
    Animated,
    StatusBar,
} from "react-native";
import React, {useRef, useState} from "react";
import {
    CardField,
    StripeProvider,
    confirmPayment,
} from "@stripe/stripe-react-native";
import {useDispatch, useSelector} from "react-redux";
import MenuTop from "../../components/MenuTop/MenuTop";
import MenuBottom from "../../components/MenuBottom/MenuBottom";
import styles from "./style";
import HeaderTitleAndReturn from "../../components/HeaderTitleAndReturn/HeaderTitleAndReturn";
import {selectTypePass} from "../../redux/typePass/typePassSlice";
import ModalError from "../../components/ModalError/ModalError";
import Loading from "../../components/Loading/Loading";
import {selectAuth} from "../../redux/auth/authSlice";
import {getNavigationRedux} from "../../redux/navigation/navigationSlice";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
import Input from "../../components/Input/Input";
import {API, API_KEY, STRIPE_PUSLISHABLE_KEY} from "@env";

export default function Buy({navigation}) {
    const [cardCompleted, setCardCompleted] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [messageModalError, setMessageModalError] = useState("");
    const [modalSuccess, setModalSuccess] = useState(false);
    const [messageModalSuccess, setMessageModalSuccess] = useState("");
    const [modalDiscount, setModalDiscount] = useState(false);
    const [discountPrice, setDiscountPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [discountValidate, setDiscountValidate] = useState(false);
    const [discountError, setDiscountError] = useState(false);
    const [loading, setLoading] = useState(false);

    const fadeModal = useRef(new Animated.Value(0)).current;

    const dispatch = useDispatch();

    const typePass = useSelector(selectTypePass);
    const auth = useSelector(selectAuth);

    const getPass = async () => {
        try {
            const response = await fetch(
                `${API}/payments/generate-pass`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.auth.userToken}`,
                        "X-DUOPASS-API-KEY": API_KEY,
                    },
                    body: JSON.stringify({
                        type_id: typePass.typePass.passId,
                        discount_applied: discountValidate,
                        discount_code: discount,
                    }),
                },
            );

            if (response.ok) {
                setMessageModalSuccess("Compra realizada com sucesso");
                setModalSuccess(true);

                setTimeout(() => {
                    setModalSuccess(false);
                    navigation.navigate("Home");
                    dispatch(getNavigationRedux("Home"));
                }, 2400);
            }
        } catch (error) {
            console.log("Erro ao tentar pegar o pass", error);

            setMessageModalError(
                "Erro ao tentar pegar o pass. Tente novamente mais tarde.",
            );
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
        } finally {
            setLoading(false);
        }
    };

    const getCourtesy = async () => {
        setLoading(true);

        try {
            const response = await fetch(
                `${API}/payments/generate-pass`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.auth.userToken}`,
                        "X-DUOPASS-API-KEY": API_KEY,
                    },
                    body: JSON.stringify({
                        type_id: typePass.typePass.passId,
                        discount_applied: discountValidate,
                        discount_code: discount,
                    }),
                },
            );

            if (response.ok) {
                setMessageModalSuccess("Compra realizada com sucesso");
                setModalSuccess(true);

                setTimeout(() => {
                    setModalSuccess(false);
                    navigation.navigate("Home");
                    dispatch(getNavigationRedux("Home"));
                }, 2400);
            }
        } catch (error) {
            console.log("Erro ao tentar pegar o pass", error);

            setMessageModalError(
                "Erro ao tentar pegar o pass. Tente novamente mais tarde.",
            );
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
        } finally {
            setLoading(false);
        }
    };

    const fetchPaymentIntentClientSecret = async () => {
        let clientSecret = "";

        setLoading(true);

        try {
            const response = await fetch(`${API}/payments/intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.auth.userToken}`,
                    "X-DUOPASS-API-KEY": API_KEY,
                },
                body: JSON.stringify({
                    type_id: typePass.typePass.passId,
                    payment_method: "card",
                    discount_code: discount,
                }),
            });

            const paymentResponse = await response.json();

            clientSecret = paymentResponse.data.client_secret;
        } catch (error) {
            console.log("Erro durante o processo de intent", error);

            setLoading(false);

            setMessageModalError(
                "Erro durante o pagamento. Tente novamente mais tarde.",
            );
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
        }

        return clientSecret;
    };

    const handlePayPress = async () => {
        Keyboard.dismiss();

        if (!cardCompleted) {
            setLoading(false);

            setMessageModalError("Preencha os dados do cartão corretamente");
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);

            return;
        }

        // Fetch the intent client secret from the backend.
        const clientSecret = await fetchPaymentIntentClientSecret();

        const billingDetails = {
            name: auth.auth.userName,
        };

        const {paymentIntent, error} = await confirmPayment(clientSecret, {
            paymentMethodType: "Card",
            paymentMethodData: billingDetails,
        });

        if (error) {
            Keyboard.dismiss();

            console.log("Erro durante o pagamento", error);

            setLoading(false);

            setMessageModalError(
                "Erro durante o pagamento. Tente novamente mais tarde",
            );
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);

            return;
        }

        if (paymentIntent) {
            Keyboard.dismiss();

            console.log("Pagamento realizado com sucesso", paymentIntent);

            getPass();
        }
    };

    const openModalDiscount = () => {
        setModalDiscount(true);

        Animated.timing(fadeModal, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const closeModalDiscount = () => {
        Keyboard.dismiss();

        Animated.timing(fadeModal, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            setDiscount("");
            setModalDiscount(false);
            setDiscountError(false);
        }, 400);
    };

    const applyDiscount = async () => {
        setLoading(true);
        Keyboard.dismiss();

        try {
            const response = await fetch(
                `${API}/payments/check-discount`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.auth.userToken}`,
                        "X-DUOPASS-API-KEY": API_KEY,
                    },
                    body: JSON.stringify({
                        type_id: typePass.typePass.passId,
                        discount_code: discount,
                    }),
                },
            );

            const discountResponse = await response.json();

            if (discountResponse.data.status === "error") {
                setDiscountError(true);
                setLoading(false);

                return;
            }

            if (discountResponse.data.is_courtesy) {
                setDiscountValidate(true);

                Animated.timing(fadeModal, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }).start();

                setTimeout(() => {
                    setModalDiscount(false);
                }, 400);

                getCourtesy();

                return;
            }

            setLoading(false);
            setDiscountValidate(true);

            Animated.timing(fadeModal, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }).start();

            setTimeout(() => {
                setModalDiscount(false);
            }, 400);

            setDiscountValidate(true);
            setDiscountPrice(discountResponse.data.new_price);
        } catch (error) {
            console.log("Erro ao tentar aplicar o desconto", error);

            closeModalDiscount();

            setLoading(false);

            setMessageModalError(
                "Erro ao tentar aplicar o desconto. Tente novamente mais tarde.",
            );
            setModalError(true);

            setTimeout(() => {
                setModalError(false);
            }, 2400);
        }
    };

    const removeDiscount = () => {
        setDiscount("");
        setDiscountValidate(false);
    };

    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="rgba(0,0,0,0)"
                translucent
            />

            <MenuTop />

            {modalError && (
                <ModalError visible={modalError} message={messageModalError} />
            )}

            {modalSuccess && (
                <ModalSuccess
                    visible={modalSuccess}
                    message={messageModalSuccess}
                />
            )}

            {modalDiscount && (
                <Animated.View
                    style={[
                        styles.modalContainer,
                        {
                            opacity: fadeModal,
                            pointerEvents: modalDiscount ? "auto" : "none",
                        },
                    ]}>
                    <View style={styles.modalBox}>
                        <Input
                            label="Digite seu cupom de desconto"
                            value={discount}
                            onChange={setDiscount}
                            colorLabel="#747474"
                            onFocus={() => setDiscountError(false)}
                            style={styles.inputDiscount}
                        />
                        {discountError && (
                            <Text
                                style={[
                                    styles.cardDescription,
                                    {color: "red"},
                                ]}>
                                Cupom inválido
                            </Text>
                        )}

                        <TouchableOpacity
                            onPress={applyDiscount}
                            style={[
                                styles.payCardButton,
                                {
                                    marginBottom: 20,
                                    backgroundColor: "#EA5B0C",
                                },
                            ]}>
                            <Text style={styles.payCardButtonText}>
                                Adicionar cupom
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={closeModalDiscount}
                            style={[
                                styles.pixButton,
                                {height: 30, marginVertical: 0},
                            ]}>
                            <Text style={styles.pixButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}

            {loading && <Loading />}

            <Pressable
                style={styles.container}
                onPress={() => Keyboard.dismiss()}>
                <HeaderTitleAndReturn title="Carrinho" />

                <View style={styles.passBox}>
                    <Text style={styles.passTitle}>
                        {typePass.typePass.passTitle}
                    </Text>
                    {discountValidate && (
                        <>
                            <Text
                                style={[
                                    styles.passPriceDescription,
                                    {textDecorationLine: "line-through"},
                                ]}>
                                de: {typePass.typePass.passPrice}
                            </Text>
                            <Text style={styles.passPriceDescription}>
                                por:{" "}
                                <Text style={{color: "#05A752"}}>
                                    {discountPrice}
                                </Text>
                            </Text>
                        </>
                    )}
                    {!discountValidate && (
                        <Text style={styles.passPriceDescription}>
                            preço: {typePass.typePass.passPrice}
                        </Text>
                    )}
                    <Text style={styles.passDescription}>
                        {typePass.typePass.passDescription}
                    </Text>
                </View>

                {discountValidate && (
                    <TouchableOpacity onPress={removeDiscount}>
                        <Text style={styles.discount}>
                            Remover cupom de desconto
                        </Text>
                    </TouchableOpacity>
                )}

                {!discountValidate && (
                    <TouchableOpacity onPress={openModalDiscount}>
                        <Text style={styles.discount}>
                            Adicionar cupom de desconto
                        </Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.cardDescription}>
                    Preencha os campos com os dados do seu cartão
                </Text>

                <StripeProvider publishableKey={STRIPE_PUSLISHABLE_KEY}>
                    <View style={styles.payContainer}>
                        <CardField
                            postalCodeEnabled={false}
                            placeholders={{
                                number: "0000 0000 0000 0000",
                            }}
                            cardStyle={{
                                backgroundColor: "#FFFFFF",
                                textColor: "#000000",
                                textFontSize: 12,
                                placeholderColor: "#A9A9A9",
                            }}
                            style={{
                                width: "100%",
                                height: 50,
                                borderWidth: 1,
                                borderColor: "rgba(0,0,0,0.6)",
                            }}
                            onCardChange={cardDetails => {
                                if (cardDetails.complete) {
                                    setCardCompleted(true);
                                }
                            }}
                        />
                    </View>
                </StripeProvider>

                <TouchableOpacity
                    style={styles.payCardButton}
                    onPress={handlePayPress}>
                    <Text style={styles.payCardButtonText}>
                        Pagar via cartão
                    </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.pixButton}>
                    <Text style={styles.pixButtonText}>Pagar via Pix</Text>
                </TouchableOpacity> */}
            </Pressable>

            <MenuBottom />
        </>
    );
}
