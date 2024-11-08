import React, { useEffect } from 'react';
import { Button, Text, View, useColorScheme, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getThemeStyles, getStyles } from './styles';
import { Image } from 'react-native-elements';
import VoteSection from './components/VoteSection';

export function MovieDetails({ navigation, route }: any) {
    const { item } = route.params;

    const isDarkMode = useColorScheme() === 'dark';
    const styles_ = getStyles();
    const themeStyles = getThemeStyles(isDarkMode);

    const voteAverage: number = item.vote_average;
    const voteCount: number = item.vote_count;

    const [genres, setGenres] = React.useState<string[]>([]);

    useEffect(() => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGViNjQ5MmY2ODJkNzBjYTRmNjhhMDQ4OGU4NGY5NCIsIm5iZiI6MTczMDc5NTA5My4zMjY2NTM1LCJzdWIiOiI2NzBlNzAxZWY1OGE5MjA2YWE0MWViMWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fcwktVxMHrcnjQHzDBdQ74jZoglQR9QaDnw3zIB1MYs'
        }
      };
      
      fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        .then(res => res.json())
        .then(res => {
          const fetchedGenres = res.genres
            .filter((genres: { id: number }) => item.genre_ids.includes(genres.id))
            .map((genres: { name: string }) => genres.name);

          setGenres(fetchedGenres);
        })
        .catch(err => console.error(err));
    }
    , []);

    return (
      <View style={[themeStyles.backgroundColor, styles_.container, {padding:20}]}>
        <View style={{width:'100%'}}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles_.button, {alignSelf:'flex-start'}]}>
            <Icon name="chevron-left" size={30} color='#F2C94C'/>
          </TouchableOpacity>
        </View>
        <View style={{width:'90%', height:'50%', margin:10}}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
            style={styles_.imageMovie} />
        </View>

        <View style={{justifyContent:'space-around', flexDirection:'row', alignItems:'center', gap:10}}>
          <Text style={[themeStyles.textColor, styles_.title]}>{item.original_title}</Text>
          <Text style={[themeStyles.textColor, styles_.maj, styles_.badgeLanguage]}>{item.original_language}</Text>
        </View>
        <FlatList
                data={genres}
                renderItem={({ item }) => (
                  <Text style={[styles_.badgeLanguage, {color:'black'}]}>{item}</Text>
                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{maxHeight:50}}
            />
        <Text style={[themeStyles.textColor]}>Release Date : {item.release_date}</Text>
        <View style={{width:100, marginTop: 10}}>
          <VoteSection voteAverage={voteAverage} voteCount={voteCount} />
        </View>

        <Text style={[themeStyles.textColor, {marginTop: 15}]}>{item.overview}</Text>
      </View>
    );
}

export default MovieDetails;