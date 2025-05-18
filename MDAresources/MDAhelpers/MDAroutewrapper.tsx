import React, { ReactNode } from 'react';
import { View, ImageBackground } from 'react-native';
import { background } from '../MDAconstants/MDAimages';
import { wrapper } from '../MDAconstants/MDAstyles';
import MDApanel from './MDApanel';

interface MDAroutewrapperProps {
    mda: ReactNode;
    MDA?: boolean;
    mdaBack?: boolean;
}

const MDAroutewrapper: React.FC<MDAroutewrapperProps> = ({ mda, MDA, mdaBack }) => {
    return (
        <ImageBackground
            source={background}
            style={wrapper.backImg}
        >
            <View
                style={[
                    wrapper.route,
                    mdaBack && { backgroundColor: '#AF650A' }
                ]}
            >
                {mda}
            </View>

            {MDA && (
                <View style={wrapper.panel}>
                    <MDApanel />
                </View>
            )}
        
        </ImageBackground>
    );
};

export default MDAroutewrapper;
