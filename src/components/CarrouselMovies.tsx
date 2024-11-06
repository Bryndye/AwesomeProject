import React, { ReactNode, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-elements';
import { useColorScheme } from 'react-native';
import { getThemeStyles, getStyles } from '../styles';

interface CarrouselMovieProps {
    props: any;
    title: string;
}
const CarrouselMovies: React.FC<CarrouselMovieProps> = ({ props, title }) => {
    if (props.length === 0) {
        return null;
    }
    else if (props["props"]){
        props = props["props"];
    }

    const isDarkMode = useColorScheme() === 'dark';
    const stylesTheme = getThemeStyles(isDarkMode);
    const styles_ = getStyles();
    const navigation = useNavigation<any>();
    
    return(
        <View style={[styles.container, styles_.section]}>
            <View style={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                <Text style={[styles.title, stylesTheme.textColor]}>{title}</Text>
                <TouchableOpacity>
                    <Text style={styles.link}>
                        See more    
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={props}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => navigation.navigate('MovieDetails', { item: item })}
                        // onPress={() => navigation.navigate('Home', { screen:'MovieDetails', params: {item : item} })}
                    >
                        <View style={{ height: '80%' }}>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w400/${item.poster_path}` }}
                                style={styles_.imageMovie}
                            />
                        </View>
                        <Text style={[styles.titleMovie, stylesTheme.textColor]}>{item.original_title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 250,
        width: '100%',
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        gap: 10,
        marginRight: 10,
        width: 100,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    titleMovie: {
        width: '100%',
        fontSize: 12,
        fontWeight: 'bold',
    },
    link: {
        color: '#F2C94C',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CarrouselMovies;