import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    item: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
        borderRadius: 24,
        height: 320,
        backgroundColor: "#fff",
        marginRight: 20,
        overflow: "hidden",
    },

    itemDescriptionContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    itemTitle: {
        fontFamily: "quicksand-bold",
        fontSize: 12,
        color: "#EA5B0C",
        textTransform: "uppercase",
        marginTop: 20,
    },

    itemDescription: {
        fontFamily: "quicksand-regular",
        fontSize: 16,
        color: "#202224",
        marginVertical: 10,
    },

    itemTags: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },

    tagNew: {
        fontFamily: "quicksand-bold",
        fontSize: 12,
        color: "#fff",
        textTransform: "uppercase",
        paddingHorizontal: 10,
        borderRadius: 100,
        backgroundColor: "#EA5B0C",
        width: 58,
        position: "absolute",
        top: 20,
        left: 20,
    },

    image: {
        width: "100%",
        height: 160,
        resizeMode: "cover",
    },
});

export default styles;
