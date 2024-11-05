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
import CarrouselMovies from './components/CarrouselMovies';

const DATA = ['All','Romance','Kids','Sport','Horror'];

type ItemProps = {title: string};

const HomeScreen = () => {
  const [category, setCategory] = useState('All');
  
  const images = [
    {
      uri: 'https://static.posters.cz/image/750/affiches-et-posters/stranger-things-one-sheet-season-2-i67844.jpg',
      title: 'Stranger Things',
    }
  ];
  const [moviesPopular, setMoviesPopular] = useState([]);
  const [moviesRated, setMoviesRated] = useState([]);
  const [moviesupcoming, setMoviesUpcoming] = useState([]);

  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGViNjQ5MmY2ODJkNzBjYTRmNjhhMDQ4OGU4NGY5NCIsIm5iZiI6MTcyODk5OTkxOC42MTMzNTEsInN1YiI6IjY3MGU3MDFlZjU4YTkyMDZhYTQxZWIxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c-TkXgOvyubf-hEgGVU6Pajj2y4TUa5IjBgG_NnN2fQ'
      }
  };
  useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`, options)
          .then(response => response.json())
          .then(data =>{ 
              setMoviesPopular(data.results);
          })
          .catch(error => console.error(error));
      fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`, options)
          .then(response => response.json())
          .then(data =>{ 
              setMoviesRated(data.results);
          })
          .catch(error => console.error(error));
          
      fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}`, options)
          .then(response => response.json())
          .then(data =>{ 
            setMoviesUpcoming(data.results);
          })
          .catch(error => console.error(error));
  }
  , []);

  const Item = ({title}: ItemProps) => (
    <TouchableOpacity 
      style={[
        styles.item,
        category === title && styles.activeItem,
      ]} 
      onPress={() => setCategory(title)}>

      <Text style={[
        styles.title,
        category === title && styles.activeTitle,
      ]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView> 

        <View style={styles.container}>
          <Image source={images[0]} style={[styles.cover]} />

          <View style={[styles.navBar, styles.absolute]} >
            <BlurView
              blurType="light"
              blurAmount={5}
              reducedTransparencyFallbackColor="white"
              style={{height:'100%', width:'100%'}}>
              <FlatList
                horizontal
                data={DATA}
                renderItem={({item}) => <Item title={item} />}
                keyExtractor={item => item}
                />
            </BlurView>
          </View>

          <View style={[styles.containerBottom, styles.absolute, {bottom: 0 }]}>
            <View style={styles.containerBottomItem}>
              <Text style={styles.title}>My List</Text>
              <Text style={styles.title}>Discover</Text>
            </View>

            <View style={[styles.containerBottomItem]}>
                <TouchableOpacity style={{width:'40%', paddingVertical:10, backgroundColor:'#7D8790', borderRadius:10}}>
                  <Text style={[styles.title, styles.containerBottomItemText]}>+ Whishlist</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'40%', paddingVertical:10, backgroundColor:'#F2C94C', borderRadius:10}}>
                  <Text style={[styles.title, styles.containerBottomItemText]}>Details</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>


        <CarrouselMovies props={moviesPopular} title='Popular'/>

        <CarrouselMovies props={moviesRated} title='Top Rated'/>
        
        <CarrouselMovies props={moviesupcoming} title='Upcoming'/>

        {/* Bloc promo */}
        {/* <View>
          
          </View> */}

        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page:{
    backgroundColor: 'black',
    // height: '100%',
    width: '100%',
    flex: 1,
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
    backgroundColor: 'black',
  },
  containerBottomItem: {
    width: '100%',
    // height: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  containerBottomItemText: {
    alignSelf: 'center',
  },
});

export default HomeScreen;