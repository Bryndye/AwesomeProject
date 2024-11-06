import React, { useEffect } from 'react';
import { Button, Text, View, useColorScheme, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getThemeStyles, getStyles } from '../styles';
import { Image } from 'react-native-elements';
import VoteSection from './VoteSection';

export function MovieDetails({ navigation, route }: any) {
    const { item } = route.params;

    const isDarkMode = useColorScheme() === 'dark';
    const styles_ = getStyles();
    const themeStyles = getThemeStyles(isDarkMode);

    const voteAverage: number = item.vote_average;
    const voteCount: number = item.vote_count;

    let genre = '';

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
          // console.log(res);
          genre = res.genres.find((genre: any) => genre.id === item.genre_ids[0]).name;
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
        <View style={{width:'50%', height:'50%', margin:10}}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w400/${item.poster_path}` }}
            style={styles_.imageMovie} />
        </View>

        <View style={{justifyContent:'space-around', flexDirection:'row', alignItems:'center', gap:10}}>
          <Text style={[themeStyles.textColor, styles_.title]}>{item.original_title}</Text>
          <Text style={[themeStyles.textColor, styles_.maj, styles_.badgeLanguage]}>{item.original_language}</Text>
        </View>
        <Text style={[themeStyles.textColor]}>{item.release_date}</Text>

        <View style={{width:100}}>
          <VoteSection voteAverage={voteAverage} voteCount={voteCount} />
        </View>

        <Text style={[themeStyles.textColor]}>{genre}</Text>

        <Text style={[themeStyles.textColor]}>{item.overview}</Text>
      </View>
    );
}

export default MovieDetails;

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#fff',
//    }
// });