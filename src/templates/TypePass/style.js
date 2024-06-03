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

    description: {
        fontFamily: "quicksand-regular",
        fontSize: 14,
        color: "#747474",
        marginVertical: 20,
    },

    passBox: {
        padding: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "rgba(0,0,0,0.08)",
        marginBottom: 30,
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

    passButton: {
        backgroundColor: "#EA5B0C",
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        marginVertical: 20,
        flexDirection: "row",
    },

    passButtonText: {
        fontFamily: "quicksand-semibold",
        fontSize: 14,
        color: "#fff",
        marginLeft: 8,
    },
});

export default styles;
