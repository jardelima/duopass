import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        marginBottom: 20,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 20,
        paddingRight: 20,
    },

    headerTitle: {
        fontFamily: "syne-medium",
        fontSize: 20,
        color: "#202224",
    },

    seeAll: {
        fontFamily: "quicksand-semibold",
        fontSize: 14,
        color: "#EA5B0C",
    },
});

export default styles;
