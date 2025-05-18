import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { panel } from '../MDAconstants/MDAstyles';
import MDApanelinfo from '../MDAconstants/MDApanelinfo';
import useNavHandler from '../MDAconstants/MDAnav';

const MDApanel: React.FC = () => {
    const { mdaActive, handleChangeMDARoute } = useNavHandler();

    return (
        <View style={panel.container}>

            {
                MDApanelinfo.map((info, idx) => (
                    <TouchableOpacity
                        key={idx}
                        style={[
                            panel.mdaBtn,
                            mdaActive === info.mdaRouteName && { backgroundColor: '#fff' }
                        ]}
                        onPress={() => handleChangeMDARoute(info.mdaRouteName)}
                    >
                        <Image
                            source={info.mdaIconImg}
                            style={[panel.mdaIcon, info.mdaRouteName && {tintColor: '#F5AA07'}]}
                        />
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

export default MDApanel;