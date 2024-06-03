import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },

    filter: {
        backgroundColor: "#EA5B0C",
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
    },

    filterQtd: {
        backgroundColor: "#FFA336",
        width: 16,
        height: 16,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -4,
        right: -4,
    },

    filterText: {
        color: "#fff",
        fontSize: 12,
        fontFamily: "quicksand-medium",
        transform: [{translateY: -2}],
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

    filterPromoButton: {
        height: 46,
        paddingHorizontal: 20,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        marginBottom: 20,
        borderRadius: 6,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpaPromo: 0.25,
        shadowRadius: 6,
        elevation: 2,
    },

    filterPromoButtonText: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#343A40",
    },

    filterSelectPromo: {
        marginTop: 20,
        backgroundColor: "#EA5B0C",
        alignItems: "center",
        justifyContent: "center",
        height: 46,
        borderRadius: 24,
    },

    filterSelectPromoText: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#fff",
    },

    pickerInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: 40,
    },

    pickerPlaceholder: {
        fontFamily: "quicksand-regular",
        fontSize: 14,
    },

    pickerContainer: {
        backgroundColor: "#fff",
        height: 40,
        borderRadius: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
        paddingHorizontal: 10,
        alignItems: "flex-start",
        justifyContent: "center",
    },

    label: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        marginBottom: 10,
        color: "#343A40",
    },

    cleanFilterPromo: {
        marginTop: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        height: 46,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#EA5B0C",
    },

    cleanFilterPromoText: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#343A40",
    },

    title: {
        fontFamily: "syne-medium",
        fontSize: 20,
        color: "#202224",
        marginBottom: 20,
        marginTop: 10,
    },

    box: {
        padding: 20,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.08)",
        borderRadius: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    boxImage: {
        width: 88,
        height: 106,
        resizeMode: "cover",
        borderRadius: 6,
    },

    boxDescription: {
        width: 210,
    },

    boxTitle: {
        fontFamily: "quicksand-bold",
        fontSize: 12,
        color: "#EA5B0C",
        textTransform: "uppercase",
        marginBottom: 10,
    },

    boxInfo: {
        fontFamily: "quicksand-regular",
        fontSize: 16,
        color: "#202224",
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomColor: "rgba(0,0,0,0.08)",
        borderBottomWidth: 1,
    },

    boxLocal: {
        fontFamily: "quicksand-semibold",
        fontSize: 12,
        color: "#747474",
        textTransform: "uppercase",
    },

    filterCategory: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#ea5b0c",
        alignSelf: "flex-start",
    },

    filterCategoryText: {
        fontFamily: "quicksand-regular",
        color: "#202224",
    },

    warningMessage: {
        fontFamily: "quicksand-regular",
        fontSize: 16,
        color: "#202224",
    },

    modalContainer: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        width: "100%",
        height: "100%",
        zIndex: 50,
    },

    modalBox: {
        backgroundColor: "#fff",
        width: "80%",
        height: 350,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        borderRadius: 6,
    },

    closeModal: {
        alignSelf: "flex-end",
    },

    selectOptionItem: {
        height: 46,
        paddingHorizontal: 20,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        marginBottom: 20,
        borderRadius: 6,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 2,
    },

    selectOptionText: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#343A40",
    },

    selectModal: {
        marginTop: 20,
        backgroundColor: "#EA5B0C",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 46,
        borderRadius: 24,
    },

    selectModalText: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#fff",
    },
});

export default styles;
