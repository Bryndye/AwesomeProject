import React from 'react';
import { Text, View, useColorScheme } from 'react-native';

import { getThemeStyles, getStyles } from '../styles';
import { Icon } from 'react-native-elements';

export function VoteSection({ voteAverage, voteCount }: { voteAverage: number; voteCount: number }) {

    const isDarkMode = useColorScheme() === 'dark';
    const styles_ = getStyles();
    const themeStyles = getThemeStyles(isDarkMode);

    return (
        <View style={styles_.voteSection}>
            <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                <Text style={[themeStyles.textColor]}>{voteAverage}</Text>
                <Icon name="star" size={20} color='#F2C94C'/>
            </View>
            <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                <Text style={[themeStyles.textColor]}>{voteCount}</Text>
                <Icon name="supervised-user-circle" size={20} color='#F2C94C'/>
            </View>
        </View>
    );
}

export default VoteSection;

