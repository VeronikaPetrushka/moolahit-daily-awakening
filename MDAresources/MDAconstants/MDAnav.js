import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useCallback } from 'react';

const useNavHandler = () => {
    const navigation = useNavigation();
    const [mdaActive, setMDAActive] = useState('MDAchallengeroute');

    const handleChangeMDARoute = useCallback((route) => {
        navigation.navigate(route);
    }, [navigation]);

    useEffect(() => {
        const chnageMDARoute = () => {
            const state = navigation.getState();
            if (state?.routes?.length) {
                const activeMDARoute = state.routes[state.index];
                if (activeMDARoute?.name) {
                    setMDAActive(activeMDARoute.name);
                }
            }
        };

        chnageMDARoute();

        const unsubscribe = navigation.addListener('state', chnageMDARoute);

        return unsubscribe;
    }, [navigation]);

    return { mdaActive, handleChangeMDARoute };
};

export default useNavHandler;