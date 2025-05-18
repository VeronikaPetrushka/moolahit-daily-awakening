import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing } from "react-native"
import { logo } from '../MDAconstants/MDAimages';
import { useNavigation } from '@react-navigation/native';

const MDAsplash = () => {
    const navigation = useNavigation();
   const scaleAnim = useRef(new Animated.Value(0.2)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ]).start();

        const timer = setTimeout(() => {
            navigation.navigate('MDAintro');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Animated.Image
                source={logo}
                style={{
                    width: '100%',
                    height: 393,
                    resizeMode: 'contain',
                    transform: [
                            { scale: scaleAnim },
                            { rotate }
                        ],
                }}
            />

        </View>
    )
};

export default MDAsplash;