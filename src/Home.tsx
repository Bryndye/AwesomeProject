import React, { ReactNode, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Image } from 'react-native-elements';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

import CarrouselMovies from './components/CarrouselMovies';
import Pub from './components/Pub';

import { useColorScheme } from 'react-native';
import { getThemeStyles, getStyles, gradientColor } from './styles';

const HomeScreen = () => {
  const [category, setCategory] = useState(-1);
  
  const images = [
    {
      uri: 'https://static.posters.cz/image/750/affiches-et-posters/stranger-things-one-sheet-season-2-i67844.jpg',
      title: 'Stranger Things',
    }
  ];
  const [moviesPopular, setMoviesPopular] = useState<any[]>([]);
  const [moviesRated, setMoviesRated] = useState<any[]>([]);
  const [moviesupcoming, setMoviesUpcoming] = useState<any[]>([]);

  // Fetch movies from API and options
  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGViNjQ5MmY2ODJkNzBjYTRmNjhhMDQ4OGU4NGY5NCIsIm5iZiI6MTcyODk5OTkxOC42MTMzNTEsInN1YiI6IjY3MGU3MDFlZjU4YTkyMDZhYTQxZWIxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c-TkXgOvyubf-hEgGVU6Pajj2y4TUa5IjBgG_NnN2fQ'
      }
  };

  const fetchMovies = (type: string, setData: React.Dispatch<React.SetStateAction<any[]>>, param = '') => {
    let baseUrl = (category !== null && category != -1) ? 'https://api.themoviedb.org/3/discover/movie' : `https://api.themoviedb.org/3/movie/${type}`; 
    baseUrl = baseUrl + `?api_key=${process.env.API_KEY}`;
    if(param) {
      baseUrl = baseUrl + param;
    }

    const finalUrl = `${baseUrl}&with_genres=${category}`;

    fetch(finalUrl, options)
      .then(response => response.json())
      .then(data => {
        if (data && data.results) {
          setData(data.results);
        }
      })
      .catch(error => console.error(error));
  };

  
  useEffect(() => {
      // Récupère les films populaires du moment
      fetchMovies('popular', setMoviesPopular);

      // Récupère la date d'aujourd'hui et celle d'un mois plus tard
      const today = new Date().toISOString().split('T')[0];
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const nextMonthStr = nextMonth.toISOString().split('T')[0];
      fetchMovies('upcoming', setMoviesUpcoming, `&primary_release_date.gte=${today}&primary_release_date.lte=${nextMonthStr}&sort_by=release_date.asc`);

      // Récupère les films les mieux notés par les utilisateurs
      fetchMovies('top_rated', setMoviesRated, '&sort_by=vote_average.desc');
  }
  , [category]);

  const [genres, setGenres] = React.useState<{ id: number; name: string }[]>([]);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, options)
      .then(res => res.json())
      .then(res => {
        res.genres.unshift({id: -1, name: 'All'});
        const fetchedGenres = res.genres
          .map((genre: { name: string }) => genre.name);
        setGenres(res.genres);
      })
      .catch(err => console.error(err));
  }
  , []);

  // Item navigation
  const Item = ({ name, id }: { name: string; id: number }) => (
    <TouchableOpacity 
      style={[
        styles.item,
        category === id && styles.activeItem,
      ]} 
      onPress={() => setCategory(id)}>

      <Text style={[
        styles.title,
        category === id && styles.activeTitle,
      ]}>{name}</Text>
    </TouchableOpacity>
  );

  const isDarkMode = useColorScheme() === 'dark';
  const stylesTheme = getThemeStyles(isDarkMode);
  const styles_ = getStyles();
  const gradient = gradientColor(isDarkMode);
  
  return (
    <SafeAreaView style={[styles.page]}>
      <ScrollView> 

        <View style={[styles.container , stylesTheme.backgroundColor]}>
          <Image source={images[0]} style={[styles.cover]} />

          <View style={[styles.navBar, styles.absolute]} >
            <BlurView
              blurType="light"
              blurAmount={5}
              reducedTransparencyFallbackColor="white"
              style={{height:'100%', width:'100%'}}>
              <FlatList
                horizontal
                data={genres}
                renderItem={({ item }) => <Item name={item.name} id={item.id} />}
                keyExtractor={item => item.id.toString()}
                />
            </BlurView>
          </View>

          <LinearGradient
            colors={[gradient.gradientColor, gradient.gradientColor2]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={[styles.containerBottom, styles.absolute, {bottom: 0 }]}
          />

          <View style={[styles.containerBottom, styles.absolute, {bottom: 0 }]}>
            <View style={styles.containerBottomItem}>
              <Text style={[styles_.title, stylesTheme.textColor]}>My List</Text>
              <Text style={[styles_.title, stylesTheme.textColor]}>Discover</Text>
            </View>

            <View style={[styles.containerBottomItem]}>
                <TouchableOpacity style={[styles.buttonCover, styles_.button, styles_.buttonGrey]}>
                  <Text style={[styles_.textButton, {color: 'white'}]}>+ Whishlist</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonCover, styles_.button, styles_.buttonYellow]}>
                  <Text style={[styles_.textButton, stylesTheme.textButtonColor]}>Details</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[styles.content, stylesTheme.backgroundColor]}>
          <CarrouselMovies props={moviesPopular} title='Popular'/>
          <CarrouselMovies props={moviesRated} title='Top Rated'/>     
          <CarrouselMovies props={moviesupcoming} title='Upcoming'/>

          <Pub />
        </View>

        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page:{
    width: '100%',
    flex: 1,
  },
  content : {
    flex: 1,
    paddingHorizontal: 30,
    // paddingLeft: 30,
  },
  container: {
    width: '100%',
    height: '50%',
    maxHeight: 400,
    position: 'relative',
  },
  navBar: {
    width: '90%',
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 10,
  },
  item: {
    minWidth: 50,
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 4,
    borderRadius: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  activeItem: {
    color: 'black',
    backgroundColor: 'white',
  },
  activeTitle: {
    color: 'black',
    backgroundColor: 'white',
  },
  cover :{
    width: '100%',
    height: '100%',
  },
  absolute:{
    position: 'absolute',
  },
  containerBottom: {
    width: '100%',
    height: '20%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  containerBottomItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonCover:{
    width: 150,
    height: 50,
  }
});

export default HomeScreen;