import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    modalContainer: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        flex: 1,
        top: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        width: "100%",
        height: "100%",
        zIndex: 90,
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
