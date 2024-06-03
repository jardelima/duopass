import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        paddingHorizontal: 20,
        backgroundColor: "#FAFAFA",
    },

    header: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },

    headerButtonReturn: {
        position: "absolute",
        left: 0,
        top: 22,
    },

    headerTitle: {
        fontFamily: "quicksand-semibold",
        color: "#202224",
    },
});

export default styles;
