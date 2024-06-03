import {Dimensions, StyleSheet} from "react-native";

const windowDimensions = Dimensions.get("window");

const styles = StyleSheet.create({
    filterStates: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: windowDimensions.width - 92,
        height: 50,
        marginRight: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.1)",
    },

    filterStatesText: {
        fontFamily: "quicksand-semibold",
        fontSize: 14,
        color: "#202224",
    },
});

export default styles;
