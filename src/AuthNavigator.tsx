import React from 'react';
import { useAuth } from '../providers/Context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import MovieDetails from './MovieDetails.tsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
        </Stack.Navigator>
    );
}

function StackNavigatorSearch() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
        </Stack.Navigator>
    );
}

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
            tabBarInactiveTintColor: styles.tabBarInactiveTintColor.color,
            tabBarActiveBackgroundColor: styles.tabBarActiveBackgroundColor.color,
            tabBarInactiveBackgroundColor: styles.tabBarInactiveBackgroundColor.color,

            headerShown: false,
        })}>
            
        {isAuthenticated ? 
            (
                <>
                    <Tab.Screen name="Home" component={StackNavigator} />
                    <Tab.Screen name="Search" component={StackNavigatorSearch} />
                    <Tab.Screen name="Whislist" component={WhishlistScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </>
            ):
            (
                <>
                    <Tab.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                </>
            )
            }
    </Tab.Navigator>
  );
};

export default AuthNavigator;
