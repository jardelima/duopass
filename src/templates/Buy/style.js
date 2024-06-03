import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        paddingHorizontal: 20,
        backgroundColor: "#FAFAFA",
    },

    header: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },

    headerButtonReturn: {
        position: "absolute",
        left: 0,
        top: 22,
    },

    headerTitle: {
        fontFamily: "quicksand-semibold",
        color: "#202224",
    },

    passBox: {
        padding: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "rgba(0,0,0,0.08)",
        marginBottom: 20,
    },

    discount: {
        fontFamily: "quicksand-semibold",
        color: "#EA5B0C",
        marginBottom: 20,
    },

    passTitle: {
        fontFamily: "quicksand-bold",
        color: "#EA5B0C",
        marginBottom: 4,
    },

    passPriceDescription: {
        fontFamily: "quicksand-semibold",
        color: "#202224",
        marginBottom: 4,
    },

    passPrice: {
        fontFamily: "quicksand-bold",
    },

    passDescription: {
        fontFamily: "quicksand-regular",
        fontSize: 12,
        color: "#747474",
    },

    cardDescription: {
        fontFamily: "quicksand-semibold",
        color: "#202224",
        marginBottom: 30,
    },

    payCardButton: {
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        backgroundColor: "#EA5B0C",
        marginBottom: 20,
    },

    payCardButtonText: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#fff",
    },

    payContainer: {
        borderColor: "rgba(0,0,0,0.08)",
        borderWidth: 1,
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: 30,
    },

    pixButton: {
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        backgroundColor: "transparent",
        marginBottom: 20,
    },

    pixButtonText: {
        fontFamily: "quicksand-regular",
        fontSize: 16,
        color: "#EA5B0C",
    },

    inputDiscount: {
        fontFamily: "quicksand-regular",
        fontSize: 16,
        color: "#343A40",
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 12,
        borderColor: "rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
        textAlign: "center",
    },

    modalContainer: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        flex: 1,
        top: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        width: "100%",
        height: "100%",
        zIndex: 20,
    },

    modalBox: {
        backgroundColor: "#fff",
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        borderRadius: 6,
    },

    modalText: {
        fontFamily: "quicksand-semibold",
        marginTop: 10,
        textAlign: "center",
        color: "#747474",
    },
});

export default styles;
