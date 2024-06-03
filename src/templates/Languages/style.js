import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    logo: {
        width: 190,
        height: 40,
        position: "absolute",
        top: 40,
        left: 20,
    },

    title: {
        fontFamily: "syne-bold",
        fontSize: 24,
        marginBottom: 5,
        color: "#202224",
    },

    subtitle: {
        fontFamily: "quicksand-regular",
        fontSize: 16,
        color: "#343A40",
    },

    container: {
        paddingHorizontal: 20,
        marginTop: 30,
    },

    selectLanguage: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 10,
        borderRadius: 6,
        marginBottom: 20,
    },

    selectLanguageImage: {
        marginRight: 10,
        marginTop: 4,
    },

    selectLanguageText: {
        fontFamily: "quicksand-regular",
        fontSize: 16,
        color: "#343A40",
    },

    buttonNext: {
        backgroundColor: "#EA5B0C",
        borderRadius: 24,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonNextText: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#fff",
    },

    modalContainer: {
        alignItems: "center",
        justifyContent: "center",
    },

    modalText: {
        fontFamily: "quicksand-semibold",
        fontSize: 14,
        color: "#202224",
        marginTop: 10,
    },

    modal: {
        backgroundColor: "#fff",
        padding: 20,
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
    },
});

export default styles;
