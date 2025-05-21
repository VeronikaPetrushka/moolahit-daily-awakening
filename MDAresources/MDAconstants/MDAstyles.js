import { StyleSheet, Dimensions } from "react-native";
import wallpapers from "./MDAwallpapers";

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
        alignSelf: 'center',
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
        width: 60,
        height: 60,
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

});

//MDAchallange

export const challenge = StyleSheet.create({

    upperPanel: {
        borderBottomWidth: 1,
        borderBottomColor: '#F5AA07',
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        backgroundColor: '#B7721E',
        paddingTop: height > 700 ? height * 0.08 : height * 0.05,
        paddingHorizontal: 44,
        paddingBottom: height * 0.03,
        marginBottom: 16
    },

    user: {
        fontSize: 26,
        fontWeight: '700',
        color: '#fff',
        marginBottom: height * 0.04,
        textAlign: 'center',
        width: '100%',
    },

    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    levelBox: {
        borderRadius: 12,
        width: 40,
        height: 40,
        backgroundColor: '#774200',
        alignItems: 'center',
        justifyContent: 'center'
    },

    levelText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
    },

    levelTitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#fff',
        marginBottom: 7
    },

    dateBox: {
        width: 140,
        backgroundColor: '#B7721E',
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#fff',
        padding: 11,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16
    },

    dateText: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
        color: '#fff',
    },

    taskContainer: {
        backgroundColor: '#B7721E',
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#fff',
        paddingTop: 11,
        paddingHorizontal: 60,
        paddingBottom: height * 0.04,
        marginBottom: 9,
        alignItems: 'center'
    },

    decorImg: {
        width: 42,
        height: 42,
        resizeMode: 'contain',
        marginBottom: 7
    },

    taskTitle: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22,
        color: '#fff',
        marginBottom: height * 0.025,
    },

    taskText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
        color: '#fff',
        textAlign: 'center'
    },

    shareButton: {
        borderRadius: 100,
        backgroundColor: '#F5AA07',
        width: 61,
        height: 61,
        alignItems: 'center',
        justifyContent: 'center'
    },

    shareIcon: {
        width: 27,
        height: 27,
        resizeMode: 'contain',
    },

    progressWrapper: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },

    progressBarBackground: {
        width: '100%',
        height: 15,
        borderRadius: 22,
        backgroundColor: '#774200',
        overflow: 'hidden',
        padding: 1
    },

    progressBarFill: {
        height: '100%',
        backgroundColor: '#1FB2E3',
        borderRadius: 22,
    },

    modalBack: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },

    wallpaper: {
        width: '100%',
        height: height * 0.36,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#fff',
        resizeMode: 'cover'
    },

    wallpaperSave: {
        width: 54,
        height: 54,
        borderRadius: 22,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        alignSelf: 'center',
        top: 10
    },

    wallpaperSaveIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }

})