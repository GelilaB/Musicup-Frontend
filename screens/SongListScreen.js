import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image ,FlatList} from 'react-native';
import { Audio } from 'expo-av';
import { songs } from '../constants';
import { genres } from '../constants';
import {useAudioPlayer} from './useAudioPlayer';

const SongListScreen = ({ route }) => {
  const { genre } = route.params;
  const selectedGenre = genres.find((g) => g.name === genre);
  const [selectedSong, setSelectedSong] = React.useState(null);



  const handleSongSelection = async (song) => {
    setSelectedSong(song);
   
  };


  return (
    <View style={styles.container}>
        <Text style={styles.songListTitle}>Songs in {genre}</Text>
      <View style={styles.genreImageContainer}>
        <Image source={selectedGenre.image} style={styles.genreImage} resizeMode="cover" />
      </View>
      <View style={styles.songListContainer}>
        
      
      </View>
     
  {selectedGenre.songs.map((song, index) => (
    <TouchableOpacity key={index} style={styles.songItemContainer} onPress={() => handleSongSelection(song)}>
      <Image source={song.artwork} style={styles.songImage} />
      <View style={styles.songDetails}>
        <Text style={styles.songTitle}>{song.title}</Text>
        <Text style={styles.songArtist}>{song.artist}</Text>
      </View>
    </TouchableOpacity>
  ))}
     
    </View>
    
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40, 
    backgroundColor: '#fff',
  },
  selectedSongContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  selectedSongImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  selectedSongDetails: {
    flex: 1,
  },
  selectedSongTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedSongArtist: {
    fontSize: 14,
    color: 'gray',
  },
  playPauseButton: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  playPauseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  genreImageContainer: {
    height: 350, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  genreImage: {
    width: '100%',
    height: '100%',
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
    textAlign: 'center',
  },
  songItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  songImage: {
    width: 80,
    height: 80,
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

export default SongListScreen;
