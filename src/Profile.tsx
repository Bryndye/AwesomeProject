import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../providers/Context';

export function ProfileScreen({ navigation }: any) {
  const { logout } = useAuth();

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />

        <Button
          title="Logout"
          onPress={logout}
        />
      </View>
    );
}

export default ProfileScreen;