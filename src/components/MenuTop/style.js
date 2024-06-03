import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    menuTop: {
        width: "100%",
        height: 115,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 15,
    },

    menuBackgroundImage: {
        width: "100%",
        height: 115,
    },

    logo: {
        width: 150,
        resizeMode: "contain",
    },

    menu: {
        position: "absolute",
        zIndex: 10,
        backgroundColor: "#ea5b0c",
        width: "100%",
        height: "100%",
        padding: 20,
    },

    buttonCloseMenu: {
        position: "absolute",
        right: 20,
        top: 50,
        zIndex: 20,
    },

    user: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 60,
        padding: 24,
        backgroundColor: "#F87B2480",
        borderRadius: 6,
        marginBottom: 30,
    },

    userImage: {
        width: 100,
        height: 100,
        borderRadius: 6,
        resizeMode: "cover",
        marginBottom: 10,
        opacity: 0.2,
    },

    userName: {
        fontFamily: "quicksand-bold",
        fontSize: 24,
        color: "#fff",
    },

    buttonMenu: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 20,
    },

    buttonMenuText: {
        fontFamily: "quicksand-semibold",
        fontSize: 18,
        color: "#fff",
        marginLeft: 10,
    },

    blockWithBorderBottom: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#FFFFFF29",
    },

    logout: {
        width: "100%",
        height: 40,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#FFA336",
        alignItems: "center",
        justifyContent: "center",
    },

    logoutText: {
        fontFamily: "quicksand-medium",
        fontSize: 16,
        color: "#fff",
    },
});

export default styles;
