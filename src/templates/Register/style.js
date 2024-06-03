import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        position: "relative",
    },

    logo: {
        width: 190,
        height: 40,
        marginTop: 30,
        marginBottom: 40,
    },

    title: {
        fontFamily: "syne-bold",
        fontSize: 24,
        color: "#FFFFFF",
    },

    subtitle: {
        fontFamily: "quicksand-medium",
        fontSize: 14,
        color: "#fff",
        marginBottom: 30,
    },

    header: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 50,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    headerTitle: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        color: "#fff",
    },

    buttonReturn: {
        position: "absolute",
        left: 14,
        top: 50,
    },

    circleBottom: {
        position: "absolute",
        bottom: 0,
        left: 0,
    },

    field: {
        marginBottom: 20,
    },

    label: {
        fontFamily: "quicksand-semibold",
        fontSize: 16,
        marginBottom: 6,
        color: "#FFFFFF",
    },

    input: {
        fontFamily: "quicksand-regular",
        fontSize: 16,
        color: "#343A40",
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 12,
        borderColor: "rgba(0,0,0,0)",
        backgroundColor: "#fff",
    },

    select: {
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 12,
        borderColor: "rgba(0,0,0,0)",
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    selectText: {
        fontFamily: "quicksand-regular",
        fontSize: 14,
        color: "#343A40",
        marginBottom: 4,
    },

    selectPhoto: {
        width: "100%",
        height: 40,
        backgroundColor: "#fff",
        alignItems: "flex-start",
        justifyContent: "center",
        borderRadius: 12,
        paddingHorizontal: 15,
    },

    selectPhotoText: {
        fontFamily: "quicksand-medium",
        fontSize: 14,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 20,
    },

    nextButton: {
        backgroundColor: "#FFA336",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        width: 48,
        height: 48,
    },

    progress: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    progressContainer: {
        width: 70,
        height: 8,
        borderRadius: 8,
        backgroundColor: "#CED4DA3D",
    },

    progressBar: {
        height: 8,
        borderRadius: 8,
        backgroundColor: "#FFA336",
    },

    progressText: {
        marginLeft: 8,
        fontFamily: "quicksand-semibold",
        fontSize: 12,
        color: "#fff",
        marginBottom: 4,
    },

    pickerInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: 40,
    },

    pickerPlaceholder: {
        fontFamily: "quicksand-medium",
        color: "rgba(0,0,0,0.4)",
        fontSize: 14,
    },

    pickerContainer: {
        backgroundColor: "#fff",
        height: 40,
        borderRadius: 12,
        marginBottom: 20,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingHorizontal: 10,
    },

    description: {
        fontFamily: "quicksand-regular",
        fontSize: 14,
        color: "#fff",
        marginBottom: 10,
    },

    fieldCheckbox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },

    finishRegisterButton: {
        backgroundColor: "#FFA336",
        width: "100%",
        zIndex: 10,
        marginBottom: 20,
        borderRadius: 24,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },

    finishRegisterText: {
        color: "#fff",
        fontFamily: "quicksand-semibold",
        fontSize: 18,
    },

    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 2,
        marginRight: 6,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: 10,
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

    modalContainerError: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        flex: 1,
        top: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        width: "100%",
        height: "100%",
        zIndex: 20,
    },

    modalBoxError: {
        backgroundColor: "#fff",
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        borderRadius: 6,
    },

    modalTextError: {
        fontFamily: "quicksand-semibold",
        marginTop: 10,
        textAlign: "center",
        color: "#747474",
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
