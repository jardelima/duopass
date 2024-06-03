import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    filterStates: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: 20,
        padding: 20,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "#F1F1F1F1",
    },

    filterStatesText: {
        fontFamily: "quicksand-semibold",
        fontSize: 14,
        color: "#202224",
    },

    filterCityOverlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.4)",
    },

    filterCity: {
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

    filterCityTitle: {
        fontFamily: "syne-medium",
        fontSize: 20,
        color: "#1E1E20",
        marginBottom: 10,
    },

    filterCitySubtitle: {
        fontFamily: "quicksand-regular",
        fontSize: 14,
        color: "#747474",
        marginBottom: 30,
    },

    filterCityButton: {
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

    filterCityButtonText: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#343A40",
    },

    filterSelectCity: {
        marginTop: 20,
        backgroundColor: "#EA5B0C",
        alignItems: "center",
        justifyContent: "center",
        height: 46,
        borderRadius: 24,
    },

    filterSelectCityText: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#fff",
    },
});

export default styles;
