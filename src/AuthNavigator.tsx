import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../providers/Context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import {
    useColorScheme,
} from 'react-native';
import { getThemeStyles } from './styles.tsx';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBookBookmark, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';

// Screens
import LoginScreen from './LoginScreen';
import HomeScreen from './Home';
import SearchScreen from './Search';
import WhishlistScreen from './Whishlist';
import ProfileScreen from './Profile';

const Tab = createBottomTabNavigator();

const AuthNavigator: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const isDarkMode = useColorScheme() === 'dark';
  const styles = getThemeStyles(isDarkMode);

  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName: any = faHome;

                // Associer des icônes aux routes (onglets)
                if (route.name === 'Home') {
                iconName = faHome;
                } else if (route.name === 'Search') {
                iconName = faMagnifyingGlass;
                }else if (route.name === 'Whislist') {
                iconName = faBookBookmark;
                }else if (route.name === 'Profile') {
                iconName = faUser;
                }

                return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: styles.tabBarActiveTintColor.color,
            tabBarInactiveTintColor: styles.tabBarActiveTintColor.color,
            tabBarActiveBackgroundColor: styles.tabBarActiveBackgroundColor.color,
            tabBarInactiveBackgroundColor: styles.tabBarInactiveBackgroundColor.color,
        })}>
            
        {!isAuthenticated ? (
                <>
                    <Tab.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                </>
            ):
            (
                <>
                    <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                    <Tab.Screen name="Search" component={SearchScreen} />
                    <Tab.Screen name="Whislist" component={WhishlistScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </>
            )
            }
    </Tab.Navigator>
  );
};

export default AuthNavigator;
