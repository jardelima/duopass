import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        paddingHorizontal: 20,
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

    field: {
        marginBottom: 20,
    },

    input: {
        fontFamily: "quicksand-regular",
        fontSize: 16,
        color: "#343A40",
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: "rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
    },

    label: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        marginBottom: 6,
        color: "#343A40",
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

    photoContainer: {
        paddingBottom: 30,
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: "#E6E9EC",
    },

    photoBox: {
        marginTop: 20,
        padding: 10,
        borderRadius: 6,
        backgroundColor: "#F4F5F6",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
    },

    photo: {
        width: 60,
        height: 60,
        resizeMode: "cover",
        borderRadius: 6,
    },

    photoButton: {
        padding: 10,
    },

    photoButtonText: {
        fontFamily: "quicksand-medium",
        color: "#EA5B0C",
        fontSize: 14,
    },

    buttonSubmit: {
        backgroundColor: "#EA5B0C",
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        marginVertical: 20,
    },

    buttonSubmitText: {
        fontFamily: "quicksand-semibold",
        color: "#fff",
    },

    buttonCancel: {
        backgroundColor: "transparent",
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        marginBottom: 20,
    },

    buttonCancelText: {
        fontFamily: "quicksand-regular",
        color: "#747474",
    },

    buttonDeleteUser: {
        fontFamily: "quicksand-medium",
        color: "red",
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
        height: 230,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        borderRadius: 6,
    },

    closeModal: {
        alignSelf: "flex-end",
        marginBottom: 10,
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

    labelDeleteUser: {
        fontFamily: "quicksand-regular",
        fontSize: 14,
        marginBottom: 10,
        color: "#343A40",
    },

    inputDeleteUser: {
        fontFamily: "quicksand-regular",
        fontSize: 16,
        color: "#343A40",
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 12,
        borderColor: "rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
    },
});

export default styles;
