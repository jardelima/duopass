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
        marginTop: 100,
        marginBottom: 10,
    },

    circleBottom: {
        position: "absolute",
        bottom: 0,
        left: 0,
    },

    title: {
        fontFamily: "syne-bold",
        fontSize: 24,
        color: "#FFFFFF",
        marginBottom: 30,
    },

    field: {
        marginBottom: 20,
    },

    label: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        marginBottom: 6,
        color: "#FFFFFF",
    },

    input: {
        fontFamily: "quicksand-regular",
        fontSize: 16,
        color: "#343A40",
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 12,
        borderColor: "rgba(0,0,0,0)",
        backgroundColor: "#fff",
    },

    forgotPassword: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 30,
    },

    forgotPasswordText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "quicksand-semibold",
    },

    login: {
        backgroundColor: "#FFA336",
        borderRadius: 24,
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 40,
    },

    loginText: {
        fontFamily: "quicksand-semibold",
        fontSize: 18,
        color: "#fff",
        marginBottom: 5,
    },

    register: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20,
    },

    registerTitle: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#fff",
        marginBottom: 10,
    },

    registerText: {
        fontFamily: "quicksand-regular",
        fontSize: 14,
        color: "#fff",
    },

    registerTextButton: {
        fontFamily: "quicksand-semibold",
        fontSize: 14,
        color: "#fff",
    },

    buttonSocialContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: 20,
        width: 150,
    },

    buttonSocial: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    headerButtonReturn: {
        position: "absolute",
        left: 20,
        top: 50,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: 24,
    },
});

export default styles;
