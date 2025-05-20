import { View, Text, ScrollView, Alert } from "react-native"
import React, { useState, useEffect } from 'react';
import { challenge } from "../MDAconstants/MDAstyles";
import challengeinfo from "../MDAconstants/MDAchallengeinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MDAlevels = () => {
    const [completedChallengesTasks, setCompletedChallengesTasks] = useState(0);

    useEffect(() => {
        const loadCompletedTasks = async () => {
            try {
                const stored = await AsyncStorage.getItem('MDA_COMPLETED_LOG');
            if (stored) {
                setCompletedChallengesTasks(JSON.parse(stored).length);
            }
            } catch (e) {
                Alert.alert('Error', 'Failed to load completed challenges');
            }
        };

        loadCompletedTasks();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            
            <View style={challenge.upperPanel}>
                <Text style={challenge.user}>Levels</Text>
            </View>

            <ScrollView style={{ width: '100%', paddingHorizontal: 26 }}>
                
                {
                    challengeinfo.map((chItem, idx) => (
                        <View key={idx} style={[challenge.taskContainer, {paddingVertical: 11, paddingHorizontal: 13}]}>
                            <View style={challenge.row}>
                                <View style={challenge.levelBox}>
                                    <Text style={challenge.levelText}>{chItem.level}</Text>
                                </View>
                                <View style={{width: '80%', alignItems: 'flex-start'}}>
                                    <Text style={challenge.levelTitle}>{chItem.title}</Text>
                                    <View style={challenge.progressBarBackground}>
                                        <View
                                            style={[
                                                challenge.progressBarFill,
                                                { width: `${(completedChallengesTasks / chItem.levelLimit) * 100}%` },
                                                (completedChallengesTasks / chItem.levelLimit) * 100 >= 100
                                                ? { backgroundColor: '#1FE336' }
                                                : { backgroundColor: '#1FB2E3' }
                                            ]}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))
                }

                <View style={{height: 200}} />
            </ScrollView>

        </View>
    )
};

export default MDAlevels;