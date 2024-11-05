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
});

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
    backgroundColor: '#121212'
  },
  textColor: {
    color: 'white'
  },
});

export const getThemeStyles = (isDarkMode: boolean) => {
  return isDarkMode ? darkTheme : lightTheme;
};
