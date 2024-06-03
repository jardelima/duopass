import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        paddingHorizontal: 20,
        backgroundColor: "#FAFAFA",
    },

    economyBox: {
        backgroundColor: "#F4F5F6",
        padding: 10,
        borderRadius: 6,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },

    economyDescription: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#747474",
    },

    economy: {
        fontFamily: "quicksand-bold",
        fontSize: 32,
        color: "#05A752",
    },

    titleBox: {
        fontFamily: "syne-medium",
        fontSize: 20,
        color: "#202224",
        marginBottom: 10,
    },

    box: {
        padding: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.08)",
        borderRadius: 6,
        marginBottom: 20,
    },

    passQtd: {
        fontFamily: "quicksand-bold",
        fontSize: 12,
        color: "#EA5B0C",
        textTransform: "uppercase",
        marginBottom: 10,
    },

    passCodeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 10,
    },

    passCodeTitle: {
        fontFamily: "quicksand-regular",
        fontSize: 16,
        color: "#747474",
    },

    passCode: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#EA5B0C",
        marginLeft: 8,
    },

    passCodeDate: {
        fontFamily: "quicksand-regular",
        fontSize: 14,
        color: "#747474",
    },

    buttonAvaliation: {
        backgroundColor: "#fff",
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#EA5B0C",
    },

    buttonAvaliationText: {
        fontFamily: "quicksand-semibold",
        color: "#EA5B0C",
        fontSize: 14,
    },

    warningMessage: {
        fontFamily: "quicksand-medium",
        color: "#747474",
        fontSize: 16,
        marginBottom: 30,
    },

    filterPromoOverlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.4)",
        bottom: 0,
    },

    filterPromo: {
        width: "100%",
        maxHeight: 400,
        height: "auto",
        position: "absolute",
        bottom: 0,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
        zIndex: 11,
        backgroundColor: "#fff",
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
    },

    filterPromoTitle: {
        fontFamily: "syne-medium",
        fontSize: 20,
        color: "#1E1E20",
        marginBottom: 30,
    },

    filterPromoSubtitle: {
        fontFamily: "quicksand-regular",
        fontSize: 14,
        color: "#747474",
        marginBottom: 30,
    },

    avaliationHeader: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 20,
    },

    avaliationName: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#343A40",
        marginBottom: 5,
    },

    avaliationImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
        resizeMode: "cover",
        marginRight: 16,
    },

    avaliationStars: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginRight: 20,
    },

    avaliationInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },

    avaliationComment: {
        fontFamily: "quicksand-regular",
        fontSize: 14,
        color: "#000000",
    },

    avaliationCommentContainer: {
        backgroundColor: "#F9F9F9",
        padding: 10,
        borderRadius: 6,
        marginBottom: 30,
    },

    historicTitle: {
        fontFamily: "quicksand-regular",
        fontSize: 14,
        color: "#747474",
        marginBottom: 10,
    },

    historicTitleBold: {
        fontFamily: "quicksand-semibold",
        fontSize: 14,
        color: "#EA5B0C",
    },
});

export default styles;
