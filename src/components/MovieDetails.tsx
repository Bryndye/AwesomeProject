import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Button, Text, View } from 'react-native';

export function MovieDetails({ navigation, route }: any) {
    const { item } = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Text>{item.}</Text> */}
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />

      </View>
    );
}

export default MovieDetails;