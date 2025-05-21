import { View, Image, Text, TouchableOpacity, Alert, Share, Modal } from "react-native"
import challengeinfo from "../MDAconstants/MDAchallengeinfo";
import wallpapers from "../MDAconstants/MDAwallpapers";
import { challenge, intro } from "../MDAconstants/MDAstyles";
import { done } from "../MDAconstants/MDAimages";
import { share, save } from "../MDAconstants/MDAicons";
import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CameraRoll from '@react-native-community/cameraroll';
import RNFS from 'react-native-fs'

const MDAchallenge = () => {
    const [user, setUser] = useState({ nickname: null, userImage: null });
    const [challengeState, setChallengeState] = useState({
        currentLevel: 1,
        completedTasks: [],
        });
    const [dailyLockedUntil, setDailyLockedUntil] = useState(null);
    const [timerActive, setTimerActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600);

    const currentLevel = challengeinfo.find(l => l.level === challengeState.currentLevel);
    const completedTasks = challengeState.completedTasks.filter(t => t.level === currentLevel?.level) || [];
    const totalTasks = currentLevel?.tasks.length || 0;

    const [showWallpaperModal, setShowWallpaperModal] = useState(false);
    const [selectedWallpaper, setSelectedWallpaper] = useState(null);
    const [usedWallpapers, setUsedWallpapers] = useState([]);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const stored = await AsyncStorage.getItem('MDA_USER');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setUser({nickname: parsed.nickname, userImage: parsed.image});
                }
            } catch (e) {
                Alert.alert('Error', 'Failed to load user');
            }
        };

        loadUser();
    }, []);

    const loadChallengeState = async () => {
        try {
            const stored = await AsyncStorage.getItem('MDA_CHALLENGE_STATE');
            if (stored) {
            setChallengeState(JSON.parse(stored));
            }
        } catch (e) {
            Alert.alert('Error', 'Failed to load challenge state');
        }
    };

    useEffect(() => {
        const loadUsedWallpapers = async () => {
            const stored = await AsyncStorage.getItem('MDA_USED_WALLPAPERS');
            if (stored) {
                setUsedWallpapers(JSON.parse(stored));
            }
        };
        loadUsedWallpapers();
    }, []);

    const saveChallengeState = async (newState) => {
        try {
            await AsyncStorage.setItem('MDA_CHALLENGE_STATE', JSON.stringify(newState));
            setChallengeState(newState);
        } catch (e) {
            Alert.alert('Error', 'Failed to save challenge state');
        }
    };

    useEffect(() => {
        loadChallengeState();
    }, []);

    const markTaskAsCompleted = async (level, index) => {
        const now = new Date();
        const completionDate = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;

        const updated = {
            ...challengeState,
            completedTasks: [
                ...challengeState.completedTasks,
                { level, index, date: completionDate }
            ]
        };

        const totalTasks = challengeinfo.find(l => l.level === level)?.tasks.length || 0;
        const completedThisLevel = updated.completedTasks.filter(t => t.level === level).length;

        if (completedThisLevel >= totalTasks) {
            updated.currentLevel = level + 1;
        }

        await saveChallengeState(updated);

        try {
            const allTasks = challengeinfo.find(l => l.level === level)?.tasks || [];
            const taskText = allTasks[index];

            const storedLog = await AsyncStorage.getItem('MDA_COMPLETED_LOG');
            const parsedLog = storedLog ? JSON.parse(storedLog) : [];

            const newEntry = { level, index, date: completionDate, task: taskText };

            await AsyncStorage.setItem('MDA_COMPLETED_LOG', JSON.stringify([...parsedLog, newEntry]));
        } catch (e) {
            Alert.alert('Error', 'Failed to log completed task');
        }
    };

    const loadDailyLock = async () => {
        const locked = await AsyncStorage.getItem('MDA_CHALLENGE_LOCK');
        if (locked) setDailyLockedUntil(Number(locked));
    };

    const lockChallengeFor24h = async () => {
        const lockUntil = Date.now() + 24 * 60 * 60 * 1000;
        try {
            await AsyncStorage.setItem('MDA_CHALLENGE_LOCK', lockUntil.toString());
            setDailyLockedUntil(lockUntil);
        } catch (e) {
            Alert.alert('Error',  'Failed to lock challenge for 24h');
        }
    };


    useEffect(() => {
        loadDailyLock();
    }, []);

    const getTimeUntilUnlock = () => {
        const remaining = dailyLockedUntil - Date.now();
        const hours = Math.floor(remaining / 3600000);
        const minutes = Math.floor((remaining % 3600000) / 60000);
        return `${hours}h ${minutes}m`;
    };

    useEffect(() => {
        if (!timerActive) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setTimerActive(false);
                    setTimeLeft(0);
                    onChallengeComplete();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timerActive]);

    const startChallengeTimer = () => {
        setTimerActive(true);
        setTimeLeft(600); // change to 5 for testing
    };

    const onChallengeComplete = async () => {
        await lockChallengeFor24h();
        const totalTasksThisLevel = challengeinfo.find(l => l.level === challengeState.currentLevel)?.tasks.length || 0;

        if (challengeState.completedTasks.filter(t => t.level === challengeState.currentLevel).length + 1 >= totalTasksThisLevel) {
            const available = wallpapers.filter((_, index) => !usedWallpapers.includes(index));
            if (available.length > 0) {
                const randIndex = Math.floor(Math.random() * available.length);
                const newWallpaperIndex = wallpapers.indexOf(available[randIndex]);
                setSelectedWallpaper(newWallpaperIndex);
                setShowWallpaperModal(true);

                const updated = [...usedWallpapers, newWallpaperIndex];
                await AsyncStorage.setItem('MDA_USED_WALLPAPERS', JSON.stringify(updated));
                setUsedWallpapers(updated);
            }
        }
        markTaskAsCompleted(challengeState.currentLevel, taskIndex);
    };


    const getNextTaskIndex = () => {
        const completed = challengeState.completedTasks
            .filter(t => t.level === challengeState.currentLevel)
            .map(t => t.index);

        const allTasks = challengeinfo.find(l => l.level === challengeState.currentLevel)?.tasks || [];
        for (let i = 0; i < allTasks.length; i++) {
            if (!completed.includes(i)) return i;
        }

        return 0;
    };

    const taskIndex = getNextTaskIndex();

    const shareCurrentLevelText = () => {
        const task = currentLevel?.tasks[taskIndex] || '';
        return `I'm working on "${currentLevel?.title}" and today's challenge is: "${task}"`;
    };

    const saveWallpaperToPhone = async () => {
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
                    setUsedWallpapers(updated);

                    Alert.alert('Success', 'Wallpaper saved to Photos.');
                    setShowWallpaperModal(false);
                } catch (err) {
                    console.error('Save error:', err);
                    Alert.alert('Need more info', 'Failed to save wallpaper.');
                }
            };

            reader.onerror = (e) => {
                console.error('FileReader error:', e);
                Alert.alert('Need more info', 'Failed to process image.');
            };

            reader.readAsDataURL(blob);
        } catch (e) {
            console.error('Fetch error:', e);
            Alert.alert('Error', 'Failed to fetch wallpaper asset.');
        }
    };
    
    //clear 24h timer
    
    const clearDailyLock = async () => {
        try {
            await AsyncStorage.removeItem('MDA_CHALLENGE_LOCK');
            // await AsyncStorage.removeItem('MDA_COMPLETED_LOG');
            // await AsyncStorage.removeItem('MDA_CHALLENGE_STATE');
            // await AsyncStorage.removeItem('MDA_USED_WALLPAPERS');
            setDailyLockedUntil(null);
            Alert.alert('Timer Reset', 'The 24h lock has been cleared.');
        } catch (e) {
            Alert.alert('Error', 'Failed to clear the 24h timer.');
        }
    };

    return (
        <View style={{flex: 1}}>

            <View style={challenge.upperPanel}>
                <Text style={challenge.user} ellipsizeMode="tail">Welcome, {user.nickname}</Text>
                <View style={challenge.row}>
                    <View style={challenge.levelBox}>
                        <Text style={challenge.levelText}>{currentLevel.level}</Text>
                    </View>
                    <View style={{width: '80%', alignItems: 'flex-start'}}>
                        <Text style={challenge.levelTitle}>{currentLevel.title}</Text>
                        <View style={challenge.progressBarBackground}>
                            <View
                            style={[
                                challenge.progressBarFill,
                                { width: `${(completedTasks.length / totalTasks) * 100}%` },
                            ]}
                            />
                        </View>
                    </View>
                </View>
            </View>

            <View style={{width: '100%', paddingHorizontal: 26, alignItems: 'center'}}>

                <View style={challenge.dateBox}>
                    <Text style={challenge.dateText}>{`${String(new Date().getDate()).padStart(2, '0')}.${String(new Date().getMonth() + 1).padStart(2, '0')}.${new Date().getFullYear()}`}</Text>
                </View>

                <View style={challenge.taskContainer}>
                    <Image source={done} style={challenge.decorImg} />
                    {dailyLockedUntil && dailyLockedUntil > Date.now() ? (
                        <Text style={challenge.taskText}>Come back tomorrow for the next challenge!</Text>
                    ) : (
                        <>
                            <Text style={challenge.taskTitle}>Your challenge today is:</Text>
                            <Text style={challenge.taskText}>{currentLevel.tasks[taskIndex]}</Text>
                        </>
                    )}
                </View>

                <View style={[
                    challenge.row,
                    { marginTop: 20 },
                    (dailyLockedUntil && dailyLockedUntil > Date.now()) && { flexWrap: 'wrap', justifyContent: 'center' }
                ]}>                
                    {dailyLockedUntil && dailyLockedUntil > Date.now() ? (
                        <TouchableOpacity style={[intro.button, { backgroundColor: '#1FB2E3', marginTop: 0 }]} disabled>
                            <Text style={intro.buttonText}>To the next challenge: {getTimeUntilUnlock()}</Text>
                        </TouchableOpacity>
                    ) : timerActive ? (
                        <TouchableOpacity style={[intro.button, {width: '75%', marginTop: 0}]} disabled>
                            <Text style={intro.buttonText}>
                                Time left:  
                                {` ${Math.floor(timeLeft / 60)
                                .toString()
                                .padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`}
                            </Text>
                        </TouchableOpacity>
                    ) : timeLeft === 0 ? (
                        <TouchableOpacity style={[intro.button, { backgroundColor: '#1FB2E3', width: '75%', marginTop: 0 }]} disabled>
                            <Text style={intro.buttonText}>Done</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={[intro.button, {width: '75%', marginTop: 0}]} onPress={startChallengeTimer}>
                            <Text style={intro.buttonText}>Start the challenge</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={[
                            challenge.shareButton,
                            (dailyLockedUntil && dailyLockedUntil > Date.now()) && { marginTop: 30 }
                        ]}
                        onPress={() => Share.share({ message: shareCurrentLevelText() })}
                    >
                        <Image source={share} style={challenge.shareIcon} />
                    </TouchableOpacity>

                </View>

                {/* <TouchableOpacity
                    style={[intro.button, { backgroundColor: '#f04e29', marginTop: 16, width: '75%' }]}
                    onPress={clearDailyLock}
                    >
                    <Text style={intro.buttonText}>Reset 24h Timer</Text>
                </TouchableOpacity> */}

                <Modal
                    visible={showWallpaperModal}
                    transparent
                    animationType="fade"
                >
                    <View style={challenge.modalBack}>
                        <View style={[challenge.taskContainer, {width: '85%', paddingHorizontal: 31, paddingVertical: 27}]}>

                            <View style={[challenge.levelBox, {marginBottom: 20}]}>
                                <Text style={challenge.levelText}>{currentLevel.level}</Text>
                            </View>

                            <View style={[challenge.progressBarBackground, {marginBottom: 13}]}>
                                <View
                                style={[
                                    challenge.progressBarFill,
                                    { width: `${(completedTasks.length / totalTasks) * 100}%` },
                                ]}
                                />
                            </View>
                            
                            <Text style={[challenge.taskTitle, { marginBottom: 8 }]}>{currentLevel.title}</Text>
                            
                            <Text style={[challenge.taskText, {marginBottom: 19}]}>Your gift:</Text>
                                
                            <View style={{width: '100%'}}>
                                {selectedWallpaper !== null && (
                                    <Image
                                        source={wallpapers[selectedWallpaper]}
                                        style={challenge.wallpaper}
                                    />
                                )}

                                <TouchableOpacity onPress={saveWallpaperToPhone} style={challenge.wallpaperSave}>
                                    <Image source={save} style={challenge.wallpaperSaveIcon} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>

            </View>
            
        </View>
    )
};

export default MDAchallenge;