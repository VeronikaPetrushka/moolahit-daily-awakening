import { View, Image, Text, TouchableOpacity, TextInput, Alert, ScrollView } from "react-native"
import { imagePlacholder } from "../MDAconstants/MDAimages";
import { save } from "../MDAconstants/MDAicons";
import { intro, challenge } from "../MDAconstants/MDAstyles";
import wallpapers from "../MDAconstants/MDAwallpapers";
import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from "react-native-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import CameraRoll from '@react-native-community/cameraroll';
import RNFS from 'react-native-fs'

const MDAmyprofile = () => {
    const [userImage, setUserImage] = useState(null);
    const [nickname, setNickname] = useState(null);
    const [usedWallpapers, setUsedWallpapers] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadUser();
            loadUsedWallpapers();
        }, [])
    );

    useEffect(() => {
        loadUser();
        loadUsedWallpapers();
    }, []);

    const loadUser = async () => {
        try {
            const stored = await AsyncStorage.getItem('MDA_USER');
            if (stored) {
                const parsed = JSON.parse(stored);
                setNickname(parsed.nickname);
                setUserImage(parsed.image);
            }
        } catch (e) {
            Alert.alert('Error', 'Failed to load user');
        }
    };


    const loadUserImage = async () => {
        try {
            const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });

            if (result.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri;
                setUserImage(uri);
            }
        } catch (error) {
            Alert.alert('Error', 'Image selection error');
        }
    };

    const loadUsedWallpapers = async () => {
        const stored = await AsyncStorage.getItem('MDA_USED_WALLPAPERS');
        if (stored) {
            setUsedWallpapers(JSON.parse(stored));
        }
    };

    const saveUser = async () => {
        if (!nickname || !userImage) {
            Alert.alert('Please enter a nickname and select an image');
            return;
        }

        try {
            const userData = {
                nickname,
                image: userImage,
            };

            await AsyncStorage.setItem('MDA_USER', JSON.stringify(userData));
            Alert.alert('Success', 'Your profile updated successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to save user');
        }
    };

        const saveWallpaperToPhone = async (selectedWallpaper) => {
        if (selectedWallpaper === null) return;

        try {
            const asset = wallpapers[selectedWallpaper];
            const resolved = Image.resolveAssetSource(asset);

            console.log('Saving asset:', resolved);

            // Fetch the image data
            const response = await fetch(resolved.uri);
            const blob = await response.blob();

            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    const base64data = reader.result.split(',')[1]; // remove "data:image/png;base64,"
                    const localPath = `${RNFS.CachesDirectoryPath}/wallpaper_${selectedWallpaper}.png`;

                    // Write to temporary local file
                    await RNFS.writeFile(localPath, base64data, 'base64');

                    // Save to gallery
                    await CameraRoll.save(localPath, { type: 'photo' });

                    // Update used wallpapers
                    const updated = [...usedWallpapers, selectedWallpaper];
                    await AsyncStorage.setItem('MDA_USED_WALLPAPERS', JSON.stringify(updated));
                    setUsedWallpapers(updated);

                    Alert.alert('Success', 'Wallpaper saved to Photos.');
                    setShowWallpaperModal(false);
                } catch (err) {
                    console.error('Save error:', err);
                    Alert.alert('Error', 'Failed to save wallpaper.');
                }
            };

            reader.onerror = (e) => {
                console.error('FileReader error:', e);
                Alert.alert('Error', 'Failed to process image.');
            };

            reader.readAsDataURL(blob);
        } catch (e) {
            console.error('Fetch error:', e);
            Alert.alert('Error', 'Failed to fetch wallpaper asset.');
        }
    };

    return (
        <View style={{ flex: 1 }}>

            <View style={[challenge.upperPanel, {marginBottom: 25}]}>
                <Text style={challenge.user}>My profile</Text>
            </View>
            
            <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center', paddingHorizontal: 26 }}>
                
                <TouchableOpacity
                    style={[intro.imageUploader, {width: 109, height: 109, marginTop: 0}]}
                    onPress={loadUserImage}
                >
                    {
                        !userImage ? (
                                <Image source={imagePlacholder} style={intro.imagePlaceholder} />
                            ) : (
                                <Image source={{uri: userImage}} style={intro.userImage} />    
                        )
                    }
                </TouchableOpacity>
                
                <TextInput
                    style={[intro.nicknameInput, {backgroundColor: '#AF650A'}]}
                    value={nickname}
                    onChangeText={setNickname}
                    placeholder="Your nickname"
                    placeholderTextColor="#774200"
                />

                <TouchableOpacity
                    style={intro.button}
                    onPress={saveUser}
                >
                    <Text style={intro.buttonText}>Save</Text>
                </TouchableOpacity>

                {
                    usedWallpapers.length > 0 && (
                        <>
                            <Text style={[challenge.user, {marginTop: 20, marginBottom: 15}]}>My gifts:</Text>

                            {
                                usedWallpapers.map((wallpaper, idx) => (
                                    <View key={idx} style={{width: '80%', marginBottom: 10}}>
                                        <Image
                                            source={wallpapers[wallpaper]}
                                            style={[challenge.wallpaper, {height: 354}]}
                                        />

                                        <TouchableOpacity
                                            onPress={() => saveWallpaperToPhone(wallpaper)}
                                            style={challenge.wallpaperSave}
                                        >
                                            <Image source={save} style={challenge.wallpaperSaveIcon} />
                                        </TouchableOpacity>
                                    </View>
                                ))
                            }

                        </>
                    )
                }

                <View style={{height: 200}} />
            </ScrollView>
                        
        </View>
    )
};

export default MDAmyprofile;