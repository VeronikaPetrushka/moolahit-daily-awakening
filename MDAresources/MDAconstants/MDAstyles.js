import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

// MDAroutewrapper
export const wrapper = StyleSheet.create({

    backImg: {
        flex: 1
    },

    route: {
        width: '100%',
        height: '100%'
    },

    panel: {
        width: '100%',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 40,
        zIndex: 10
    }

});

// MDApanel

export const panel = StyleSheet.create({

    container: {
        width: '85%',
        borderRadius: 500,
        borderWidth: 2,
        borderColor: '#774200',
        backgroundColor: '#B7721E',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 9,
        paddingVertical: 8
    },

    mdaIcon: {
        width: 32,
        height: 32,
        resizeMode: 'contain'
    },

    mdaBtn: {
        width: width * '24%',
        height: width * '24%',
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center'
    }

});

//MDAintro

export const intro = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: height * 0.08,
        paddingHorizontal: 50
    },

    logoImage: {
        width: width,
        height: height * 0.4,
        resizeMode: 'contain',
        marginBottom: height * 0.04
    },

    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#fff',
        marginBottom: height * 0.025
    },

    text: {
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 22,
        color: '#fff',
    },

    button: {
        width: '100%',
        padding: 20,
        borderRadius: 500,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#F5AA07',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.03
    },

    buttonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#774200',
    },

    imageUploader: {
        width: 216,
        height: 216,
        backgroundColor: '#fff',
        borderRadius: 500,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginBottom: 24,
        marginTop: height * 0.05
    },

    imagePlaceholder: {
        width: 86,
        height: 86,
        resizeMode: 'contain',
        zIndex: 10
    },

    userImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    nicknameInput: {
        width: '100%',
        padding: 20,
        borderRadius: 500,
        borderWidth: 1,
        borderColor: '#fff',
        fontSize: 18,
        fontWeight: '700',
        color: '#fff'
    }

})