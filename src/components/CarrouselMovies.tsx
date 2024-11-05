import React, { ReactNode, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { Image } from 'react-native-elements';
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
    
    return(
        <View style={styles.container}>
            <View style={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity>
                    <Text style={styles.link}>
                        See more    
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={props}
                renderItem={({item}) => (
                    <View style={styles.item}>
                        <View style={{height:'80%'}}>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w400/${item.poster_path}` }}
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.titleMovie}>{item.original_title}</Text>
                    </View>
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
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        gap: 10,
        marginRight: 10,
        width: 100,
    },
    image: {
        minWidth: 100,
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    title: {
        // width: '100%',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15,
    },
    titleMovie: {
        width: '100%',
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
    link: {
        color: 'yellow',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CarrouselMovies;