import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    closeOnboarding: {
        position: "absolute",
        top: 50,
        right: 20,
        zIndex: 10,
    },

    onboardingItemImage: {
        resizeMode: "cover",
        position: "relative",
    },

    onboardingItemContent: {
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 250,
        borderTopRightRadius: 22,
        borderTopLeftRadius: 22,
        paddingTop: 30,
        paddingHorizontal: 20,
    },

    onboardingItemTitle: {
        fontFamily: "syne-bold",
        fontSize: 24,
        color: "#202224",
        textAlign: "center",
        marginBottom: 16,
    },

    onboardingItemDescription: {
        fontFamily: "quicksand-medium",
        fontSize: 16,
        color: "#747474",
        textAlign: "center",
        marginBottom: 40,
    },

    paginationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        height: 64,
        paddingVertical: 20,
    },

    pagination: {
        flexDirection: "row",
    },

    paginationDot: {
        height: 6,
        borderRadius: 50,
        marginRight: 10,
        backgroundColor: "#EA5B0C",
    },

    nextButton: {
        backgroundColor: "#EA5B0C",
        borderRadius: 50,
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
    },
});

export default styles;
