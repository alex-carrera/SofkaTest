import { StyleSheet } from "react-native";

export const globalColors = {
    primary: '#FFDD00',
    secondary: '#E9ECF3',
    warning: '#D51E08',
    headerText: '#283C6C',

    background: '#fff',
}

export const globaStyles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: globalColors.background,
    },

    primaryButton: {
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },

    buttonPrimatyText: {
        color: globalColors.headerText,
        fontSize: 16,
        fontWeight: 'bold'
    },

    buttonWarningText: {
        color: globalColors.background,
        fontSize: 16,
        fontWeight: 'bold'
    },

    listButton: {
        backgroundColor: globalColors.primary,
        borderRadius: 4,
        padding: 10,
        width: '100%',
        alignItems: 'center'
    },

    textButton: {
        color: globalColors.secondary,
        fontSize: 18,
    },

    headerText: {
        fontSize: 20,
        marginBottom: 6
    },


    form: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },

    inputForm: {
        height: 50,
        borderColor: "#C1C1C2",
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
    },

    warningForm: {
        height: 50,
        borderColor: "red",
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
    },

    product: {
        height: 60,
        borderColor: "#F1F2F8",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },

    productText: {
        color: "#C1C1C1"
    },

    errorText: {
        color: "red",
        marginTop: -10,
        marginBottom: 10,
    },

    description: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        columnGap: 100,
        marginBottom: 20
    },

    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 4,
        shadowRadius: 4,
        elevation: 5,
    },

    modalText: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    },

});