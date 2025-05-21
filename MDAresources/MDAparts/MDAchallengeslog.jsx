import { View, Image, Text, TouchableOpacity, ScrollView, Alert, Share } from "react-native"
import React, { useState, useEffect } from 'react';
import { challenge } from "../MDAconstants/MDAstyles";
import { share } from "../MDAconstants/MDAicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MDAchallengeslog = () => {
    const [completedChallengesTasks, setCompletedChallengesTasks] = useState([]);

    useEffect(() => {
        const loadCompletedTasks = async () => {
            try {
                const stored = await AsyncStorage.getItem('MDA_COMPLETED_LOG');
            if (stored) {
                setCompletedChallengesTasks(JSON.parse(stored));
            }
            } catch (e) {
                Alert.alert('Error', 'Failed to load completed challenges');
            }
        };

        loadCompletedTasks();
    }, []);

    return (
        <View style={{flex: 1}}>

            <View style={challenge.upperPanel}>
                <Text style={challenge.user}>Challenges log</Text>
            </View>

            <View style={{width: '100%', flexGrow: 1, paddingHorizontal: 26}}>

                {
                    completedChallengesTasks.length > 0 ? (
                        <ScrollView style={{ width: '100%' }}>
                            
                            {
                                completedChallengesTasks.map((chTask, idx) => (
                                    <View key={idx} style={[challenge.taskContainer, {marginBottom: 7}]}>
                                        <Text style={challenge.taskTitle}>{chTask.date}</Text>
                                        <Text style={challenge.taskText}>{chTask.task}</Text>

                                        <TouchableOpacity
                                            style={[
                                                challenge.shareButton,
                                                {
                                                    position: 'absolute',
                                                    top: 10,
                                                    right: 10,
                                                    height: 35,
                                                    width: 35
                                                }
                                            ]}
                                            onPress={() => Share.share({
                                                message: `I completed this challenge on ${chTask.date}: "${chTask.task}" #MDAChallenge`
                                            })}
                                        >
                                            <Image
                                                source={share}
                                                style={[
                                                    challenge.shareIcon,
                                                    { width: 18, height: 18 }
                                                ]}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ))
                            }

                            <View style={{height: 400}} />
                        </ScrollView>
                    ) : (
                        <View style={challenge.taskContainer}>
                            <Text style={challenge.taskText}>You do not have any completed tasks yet...</Text>
                        </View>
                    )
                }

            </View>
            
        </View>
    )
};

export default MDAchallengeslog;