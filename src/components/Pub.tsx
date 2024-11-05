import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Button, Image } from 'react-native-elements';

import { useColorScheme } from 'react-native';
import { getThemeStyles, getStyles } from '../styles';

import reduc_bf from '../assets/reduc_bf.jpg';

const Pub = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const stylesTheme = getThemeStyles(isDarkMode);
  const styles_ = getStyles();
  
  return (
    <View style={[styles.container, styles_.section]}>
        <Image source={reduc_bf} style={styles_.imagePub} />
        <Text style={[stylesTheme.textColor, styles_.title]}>Black Friday is Here!</Text>
        <Text style={stylesTheme.textColor}>Get 50% off on all products</Text>
        <TouchableOpacity style={[styles_.button, styles_.buttonYellow]}>
            <Text style={[stylesTheme.textButtonColor, , styles_.textButton]}>Check Details</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    gap: 10,
  }
});

export default Pub;