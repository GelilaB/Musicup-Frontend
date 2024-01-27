import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'; 

import { Audio } from 'expo-av';
import { songs } from '../constants';
import { genres } from '../constants';


const GenreScreen = () => {
  const navigation = useNavigation();
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    const soundObject = new Audio.Sound();

    return async () => {
      await soundObject.unloadAsync();
    };
  }, []); 
  const genreRows = [
    genres.slice(0, 2),   
    genres.slice(2, 4),   
    [genres[4], genres[5]], 
  ];
  const handleGenrePress = (genre) => {
    console.log('Selected Genre:', genre);
    setSelectedGenre(genre);
    navigation.navigate('SongList', { genre });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Genres</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.genreScrollContainer}
      >
        {genreRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.genreRowContainer}>
          {row.map((genre, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.genreBox, selectedGenre === genre.name && styles.selectedGenreBox]}
              onPress={() => handleGenrePress(genre.name)}
            >
              <View style={styles.genreImageContainer}>
                <Image source={genre.image} style={styles.genreImage} resizeMode="cover" />
              </View>
              <Text style={[styles.genreText, selectedGenre === genre.name && styles.selectedGenreText]}>
                {genre.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        ))}
      </ScrollView>
    
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  genreScrollContainer: {
    flexGrow: 1,
  },
  genreRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  genreBox: {
    width: '46%', 
    aspectRatio: 1,
    backgroundColor: '#F3F8FF',
    padding: 15,
    marginBottom: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGenreBox: {
    backgroundColor: '#B6BBC4',
  },
  genreImageContainer: {
    width: '100%', 
    aspectRatio: 1, 
    marginBottom: 10,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  genreImage: {
    width: '100%', 
    height: '100%', 
    borderRadius: 8, 
  },
  genreText: {
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  songImage: {
    width: 80, 
    height: 80, 
    marginRight: 10,
    borderRadius: 5,
  },
  selectedGenreText: {
    color: 'white',
  },
  songListContainer: {
    borderTopWidth: 1,
    borderColor: 'lightgray',
    paddingTop: 20,
  },
  songListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  songItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  songImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  songDetails: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  songArtist: {
    fontSize: 14,
    color: 'gray',
  },
});

export default GenreScreen;