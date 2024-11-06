import React from 'react';
import { Text, View, useColorScheme } from 'react-native';

import { getThemeStyles, getStyles } from '../styles';
import { Icon } from 'react-native-elements';

export function VoteSectionMini({ voteAverage }: { voteAverage: number; }) {

    const isDarkMode = useColorScheme() === 'dark';
    const styles_ = getStyles();
    const themeStyles = getThemeStyles(isDarkMode);

    const newVoteAverage = Math.round(voteAverage * 10) / 10;

    return (
        <View style={[{position:'absolute', bottom:0, right: 0}]}>
            <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                <Text style={[themeStyles.textColor]}>{newVoteAverage}</Text>
                <Icon name="star" size={20} color='#F2C94C'/>
            </View>
        </View>
    );
}

export default VoteSectionMini;

