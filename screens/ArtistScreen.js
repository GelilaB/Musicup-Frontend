import React, { useState } from 'react';
import { View,FlatList, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const artistsData = [
  {
    id: 1,
    name: 'Mez-mariye',
    image: require('../assets/images/song1.jpg'),

    songList: ['Alive', 'Power', 'Feelings', 'All That Matters'],

  },
  {
    id: 2,
    name: 'James Arture',
    image: require('../assets/images/song2.jpg'),

    songList: ['Bad Lie', 'Save You Now', 'Calm Down', 'Life', 'My Last'],
  },
];


artistsData.forEach((artist) => {
  artist.songs = artist.songList.length;
});


function ArtistScreen() {
  const [selectedArtist, setSelectedArtist] = useState(null);

  const renderArtistItem = (item) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.artistItem}
        onPress={() => setSelectedArtist(item)}
      >
        <View style={styles.artistImageContainer}>
          <Image source={item.image} style={styles.artistImage} resizeMode="cover" />
        </View>
        <View style={styles.artistInfo}>
          <Text style={styles.artistName}>{item.name}</Text>
          <Text style={styles.songCount}>{`${item.songs} Songs`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const artistList = artistsData.map((artist) => renderArtistItem(artist));

  if (selectedArtist) {
    return (
      <View style={styles.detailsContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedArtist(null)}>
          <MaterialIcons name="arrow-back" size={24} color="#555" />
          <Text style={styles.backButtonText}>{' Back'}</Text>
        </TouchableOpacity>
      <View style={styles.topBar}>
      <Text style={styles.artistName}>{selectedArtist.name}</Text>
      <Text style={styles.songCount}>{`${selectedArtist.songs} Songs`}</Text>
        <Text style={styles.songListHeader}>Song List:</Text>
        <ScrollView>
          {selectedArtist.songList.map((song, index) => (
            <Text key={index} style={styles.songItem}>{song}</Text>
          ))}
        </ScrollView>
      </View>
      <View style={styles.centerContent}>
        
        
      </View>
    </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {artistList}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  artistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  artistImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 45,
    overflow: 'hidden',
  },
  artistImage: {
    width: '100%',
    height: '100%',
  },
  artistInfo: {
    flex: 1,
    marginLeft: 10,
  },
  artistName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  songCount: {
    fontSize: 16,
    color: 'gray',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
    detailsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', 
  },
  backButton: {
    marginBottom: 15,
  },
 
 
  songListContainer: {
    maxHeight: 200, 
  },
  songItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  detailsContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 150,
    zIndex: 1,
    flex: 1,
    justifyContent: 'left',
    alignItems: 'left',
  },
  topBar: {
    position: 'relative',
    top: 40,
    left: 60,
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#F3F8FF', 
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
 
  backButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#555',
  },
  artistName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  songCount: {
    fontSize: 17,
    marginBottom: 10,
    color: '#666',
  },
  songListHeader: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  songItem: {
    fontSize: 17,
    marginBottom: 5,
    color: '#444',
  },
  artistImage: {
    width: '100%',
    height: 200, 
    marginBottom: 15,
  },
});

export default ArtistScreen;