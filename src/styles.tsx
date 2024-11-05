import { text } from '@fortawesome/fontawesome-svg-core';
import { StyleSheet } from 'react-native';

const lightTheme = StyleSheet.create({
  tabBarActiveTintColor: {
    color: '#333333'
  },
  tabBarInactiveTintColor: {
    color: 'gray'
  },
  tabBarActiveBackgroundColor: {
    color: 'white'
  },
  tabBarInactiveBackgroundColor: {
    color: 'white'
  },
  backgroundColor: {
    backgroundColor: '#F2F2F2'
  },
  textColor: {
    color: '#333333'
  },
  textButtonColor: {
    color: 'white',
  },
  gradientColor:{
    color: 'white' as 'white',
  }
});
const gradientColorLigth = {
  gradientColor: 'rgba(255, 255, 255, 1)',
  gradientColor2: 'rgba(255, 255, 255, 0)',
};
 
const gradientColorDark = {
  gradientColor: 'rgba(0, 0, 0, 1)',
  gradientColor2: 'rgba(0, 0, 0, 0)',
};

export const gradientColor = (isDarkMode: boolean) => {
  return isDarkMode ? gradientColorDark : gradientColorLigth;
}

const darkTheme = StyleSheet.create({
  tabBarActiveTintColor: {
    color: '#F2C94C'
  },
  tabBarInactiveTintColor: {
    color: 'white'
  },
  tabBarActiveBackgroundColor: {
    color: 'black'
  },
  tabBarInactiveBackgroundColor: {
    color: 'black'
  },
  backgroundColor: {
    backgroundColor: 'black'
  },
  textColor: {
    color: 'white',
  },
  textButtonColor: {
    color: '#333333',
  },
  gradientColor:{
    color: 'black',
  }
});

const theme = {
  section : {
    marginVertical: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold' as 'bold',
  },
  button:{
      borderRadius:10,
      paddingVertical:10,
      justifyContent: 'center' as 'center',
      alignItems: 'center' as 'center',
  },
  buttonYellow: {
      backgroundColor:'#F2C94C',
  },
  buttonGrey: {
      backgroundColor:'#7D8790',
  },
  textButton:{
    fontWeight: 'bold' as 'bold',
    fontSize: 16,
  },
  imagePub:{
      height: 150,
  }
};

export const getThemeStyles = (isDarkMode: boolean) => {
  return isDarkMode ? darkTheme : lightTheme;
};

export const getStyles = () => {
    return theme;
}