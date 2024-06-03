import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    banner: {
        position: "relative",
    },

    bannerImage: {
        width: "100%",
        height: 350,
        resizeMode: "cover",
    },

    buttonReturn: {
        position: "absolute",
        top: 20,
        left: 20,
        backgroundColor: "#00000066",
        width: 20,
        height: 20,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    },

    pagination: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        transform: [
            {
                translateY: -30,
            },
        ],
    },

    paginationItem: {
        height: 4,
        borderRadius: 100,
        marginLeft: 10,
    },

    tags: {
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },

    tag: {
        fontFamily: "quicksand-semibold",
        fontSize: 12,
        textAlign: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        marginRight: 8,
    },

    title: {
        fontFamily: "syne-semibold",
        fontSize: 26,
        color: "#202224",
        paddingHorizontal: 20,
        marginVertical: 20,
    },

    infos: {
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
        marginBottom: 20,
    },

    info: {
        alignItems: "center",
        flexDirection: "row",
    },

    infoText: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        marginRight: 4,
    },

    separator: {
        width: 4,
        height: 4,
        borderRadius: 100,
        backgroundColor: "#D9D9D9",
        marginHorizontal: 10,
        transform: [{translateY: 2}],
    },

    description: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },

    descriptionText: {
        fontFamily: "quicksand-regular",
        fontSize: 16,
        color: "#747474",
    },

    buyButtonContainer: {
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#D1D5DB",
        width: "90%",
        alignSelf: "center",
    },

    buyButton: {
        backgroundColor: "#EA5B0C",
        width: "100%",
        height: 48,
        borderRadius: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    buyButtonText: {
        color: "#fff",
        fontFamily: "quicksand-semibold",
        fontSize: 18,
    },

    benefits: {
        width: "90%",
        paddingBottom: 30,
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: "#D1D5DB",
        alignSelf: "center",
    },

    benefitsTitle: {
        fontFamily: "quicksand-medium",
        fontSize: 16,
        color: "#EA5B0C",
        marginBottom: 20,
    },

    benefitsItem: {
        flexDirection: "row",
        alignItems: "flex-start",
    },

    benefitsCircle: {
        width: 4,
        height: 4,
        borderRadius: 100,
        backgroundColor: "#EA5B0C",
        marginRight: 10,
    },

    benefitsDescription: {
        fontFamily: "quicksand-regular",
        fontSize: 16,
        color: "#747474",
        transform: [{translateY: -10}],
    },

    rules: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 6,
        padding: 20,
        marginTop: 20,
    },

    rulesButton: {
        width: "100%",
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        transform: [{translateY: -16}],
    },

    rulesButtonText: {
        flexDirection: "row",
        alignItems: "center",
    },

    rulesText: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#747474",
    },

    rulesDescription: {
        fontFamily: "quicksand-regular",
        fontSize: 14,
        color: "#747474",
    },

    localInfo: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },

    localInfoHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 4,
    },

    localInfoTitle: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#747474",
        marginLeft: 10,
    },

    localInfoDescription: {
        fontFamily: "quicksand-regular",
        fontSize: 16,
        color: "#747474",
    },

    localInfoButton: {
        fontFamily: "quicksand-semibold",
        fontSize: 14,
        color: "#EA5B0C",
    },

    calendar: {
        width: "90%",
        alignSelf: "center",
        marginVertical: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#D1D5DB",
    },

    calendarHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 10,
    },

    calendarTitle: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#747474",
        marginLeft: 10,
    },

    calendarTable: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 4,
        padding: 16,
    },

    calendarTh: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    calendarColumnType: {
        minWidth: 60,
    },

    calendarText: {
        fontFamily: "quicksand-semibold",
        fontSize: 14,
        color: "#747474",
    },

    calendarItem: {
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 28,
        backgroundColor: "#D1D5DB3D",
        borderRadius: 4,
    },

    socials: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 20,
    },

    social: {
        flexDirection: "row",
        alignItems: "center",
    },

    socialText: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        marginLeft: 10,
        color: "#747474",
    },

    buttonOffer: {
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 40,
    },

    buttonOfferItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EA5B0C",
        width: "100%",
        height: 50,
        borderRadius: 100,
    },

    buttonOfferText: {
        fontFamily: "quicksand-semibold",
        fontSize: 18,
        color: "#fff",
        marginLeft: 8,
    },

    buyOverlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.4)",
    },

    buyDrawer: {
        flex: 1,
        width: "100%",
        height: "100%",
        position: "absolute",
        bottom: 0,
        paddingHorizontal: 20,
        paddingTop: 0,
        paddingBottom: 20,
        zIndex: 11,
        backgroundColor: "#fff",
    },

    buyTitle: {
        fontFamily: "syne-medium",
        fontSize: 20,
        color: "#1E1E20",
        marginBottom: 10,
    },

    buyStore: {
        fontFamily: "quicksand-bold",
        fontSize: 12,
        color: "#EA5B0C",
        textTransform: "uppercase",
        marginBottom: 10,
    },

    buyDescription: {
        fontFamily: "quicksand-regular",
        fontSize: 16,
        color: "#202224",
        marginBottom: 30,
    },

    buyCodeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

    buyCodeDescription: {
        fontFamily: "quicksand-regular",
        fontSize: 14,
        color: "#747474",
    },

    buyCode: {
        fontFamily: "quicksand-semibold",
        fontSize: 14,
        color: "#EA5B0C",
        marginLeft: 4,
    },

    buyInputContainer: {
        paddingHorizontal: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.4)",
        backgroundColor: "#fff",
        width: "100%",
        height: 40,
        marginBottom: 20,
    },

    buyInput: {
        fontFamily: "quicksand-regular",
        fontSize: 16,
        color: "#343A40",
        height: 40,
        paddingHorizontal: 5,
    },

    buyIcon: {
        position: "absolute",
        top: 8,
        right: 8,
    },

    buyCodeButton: {
        width: "100%",
        height: 48,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },

    buyCodeButtonText: {
        color: "#fff",
        fontFamily: "quicksand-semibold",
        textAlign: "center",
    },

    buySuccessMessage: {
        backgroundColor: "#05A752",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        paddingVertical: 10,
        marginVertical: 20,
    },

    buySuccessMessageTitle: {
        fontFamily: "quicksand-bold",
        color: "#fff",
        fontSize: 18,
    },

    buySuccessMessageDescription: {
        fontFamily: "quicksand-medium",
        color: "#fff",
        fontSize: 18,
    },

    values: {
        backgroundColor: "#F4F5F6",
        padding: 16,
        borderRadius: 4,
        marginBottom: 30,
    },

    valuesItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    valuesTitle: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#747474",
    },

    valuesValue: {
        fontFamily: "quicksand-semibold",
        fontSize: 20,
        color: "#202224",
    },

    avaliation: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    avaliationTitle: {
        fontFamily: "quicksand-regular",
        color: "#747474",
    },

    avaliationStars: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },

    avaliationLabel: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#343A40",
        marginBottom: 5,
    },

    avaliationText: {
        fontFamily: "quicksand-regular",
        fontSize: 14,
        color: "#343A40",
        paddingHorizontal: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        marginBottom: 20,
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
        height: "100%",
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: "#fff",
    },

    filterPromoTitle: {
        fontFamily: "syne-medium",
        fontSize: 20,
        color: "#1E1E20",
    },

    filterPromoSubtitle: {
        fontFamily: "quicksand-regular",
        fontSize: 14,
        color: "#747474",
        marginBottom: 30,
    },

    bottomAvaliation: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.08)",
    },

    avaliationHeader: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 10,
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

    modalAvaliationStars: {
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
    },
});

export default styles;
