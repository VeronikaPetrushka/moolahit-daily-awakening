import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView } from "react-native"
import { intro, challenge } from "../MDAconstants/MDAstyles";
import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const MDAdailyreflection = () => {
    const [reflection, setReflection] = useState(null);

    const saveReflection = async () => {
        if (!reflection) {
            Alert.alert('Please give some reflection...');
            return;
        }

        try {
            const newEntry = {
                reflection,
                date: new Date().toISOString(),
            };

            const existing = await AsyncStorage.getItem('MDA_REFLECTIONS');
            const parsed = existing ? JSON.parse(existing) : [];

            const updated = [...parsed, newEntry];

            await AsyncStorage.setItem('MDA_REFLECTIONS', JSON.stringify(updated));

            Alert.alert('Success', 'Your reflection saved successfully!');
            setReflection(null);
        } catch (error) {
            Alert.alert('Error', 'Failed to save reflection');
        }
    };

    return (
        <View style={{ flex: 1 }}>

            <View style={[challenge.upperPanel, {marginBottom: 25}]}>
                <Text style={challenge.user}>Daily Reflection</Text>
            </View>
            
            <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center', paddingHorizontal: 26 }}>

                <Text style={[challenge.taskTitle, {textAlign: 'left', alignSelf: 'flex-start'}]}>Be honest. Or be silent. Both are true.</Text>
                                
                <TextInput
                    style={[
                        intro.nicknameInput,
                        { backgroundColor: '#AF650A', minHeight: 171, borderRadius: 22, color: '#1FB2E3' }]}
                    value={reflection}
                    onChangeText={setReflection}
                    placeholder="What did I really feel today?"
                    placeholderTextColor="#774200"
                    multiline
                />

                <TouchableOpacity
                    style={intro.button}
                    onPress={saveReflection}
                >
                    <Text style={intro.buttonText}>Send</Text>
                </TouchableOpacity>

                <View style={{height: 200}} />
            </ScrollView>
                        
        </View>
    )
};

export default MDAdailyreflection;