import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        position: "relative",
    },

    logo: {
        width: 190,
        height: 40,
        marginTop: 30,
        marginBottom: 40,
    },

    title: {
        fontFamily: "syne-bold",
        fontSize: 24,
        color: "#FFFFFF",
    },

    subtitle: {
        fontFamily: "quicksand-medium",
        fontSize: 14,
        color: "#fff",
        marginBottom: 30,
    },

    header: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 50,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    headerTitle: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#fff",
    },

    buttonReturn: {
        position: "absolute",
        left: 14,
        top: 50,
    },

    circleBottom: {
        position: "absolute",
        bottom: 0,
        left: 0,
    },

    finishRegisterButton: {
        backgroundColor: "#FFA336",
        width: "100%",
        zIndex: 10,
        marginBottom: 20,
        borderRadius: 24,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },

    finishRegisterText: {
        color: "#fff",
        fontFamily: "quicksand-semibold",
        fontSize: 16,
    },
});

export default styles;
