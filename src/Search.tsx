import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-elements';
import { useColorScheme } from 'react-native';
import { getThemeStyles, getStyles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  interface Movie {
    id: number;
    poster_path: string;
    original_title: string;
  }

  const [results, setResults] = useState<Movie[]>([]);
  const isDarkMode = useColorScheme() === 'dark';
  const stylesTheme = getThemeStyles(isDarkMode);
  const styles_ = getStyles();
  const navigation = useNavigation<any>();

  const fetchMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}`);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={[styles.container, stylesTheme.backgroundColor]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
        <Icon name="search" size={25} color='#F2C94C' style={{ marginRight: 10, height:40, alignSelf:'center' }} />
        <TextInput
          style={[styles.searchBar, { flex: 1 }]}
          placeholder="Search for a movie..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={fetchMovies}
        />
      </View>
      {results.length === 0 && <Text style={[styles.titleMovie, stylesTheme.textColor]}>No results found</Text>}
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Home', { screen: 'MovieDetails', params: { item: item } })}
          >
            <View style={{ height: '75%' }}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w400/${item.poster_path}` }}
                style={styles_.imageMovie}
              />
            </View>
            <Text style={[styles.titleMovie, stylesTheme.textColor]}>{item.original_title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    gap: 10,
    marginBottom: 10,
    marginRight: '5%',
    width: '30%',
    height: 200,
  },
  titleMovie: {
    width: '100%',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default SearchScreen;