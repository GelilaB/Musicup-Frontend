import React, { useState } from 'react';
import { View, Text, TextInput,TouchableOpacity, Button, FlatList, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AntDesign, Entypo,MaterialIcons } from '@expo/vector-icons'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av'; 

const SearchScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [sound, setSound] = useState(null);

  const dummyData = [
    {
      id: 1,
      title: 'Alive',
      artist: 'Mez-Mariye',
      image: require('../assets/images/song1.jpg'),
      songs: require('../assets/audio/musicp3.mp3')
    },
    {
      id: 2,
      title: 'Mercy',
      artist: 'Shawn Mendes',
      image: require('../assets/images/song2.jpg'),
      songs: require('../assets/audio/music2.mp3')
    },
    {
      id: 3,
      title: 'Stay',
      artist: 'James Arture',
      image: require('../assets/images/song3.jpg'),
      songs: require('../assets/audio/musicp.mp3')
    }
  ];

  const handleSearch = () => {
    const filteredData = dummyData.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filteredData.length > 0 ? filteredData : ['Not found']);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const stopSound = async () => {
    if (sound) {
      console.log('Stopping Sound');
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const playSound = async (song) => {
    try {
      if (sound) {
        await stopSound();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(song);
      setSound(newSound);

      console.log('Playing Sound');
      await newSound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error in playSound:', error);
    }
  };

  const handleSongPress = async (itemId, title, songs) => {
    console.log(`Pressed on song: ${title} (ID: ${itemId})`);

    const selected = dummyData.find((item) => item.id === itemId);
    setSelectedSong(selected);

    if (selected && selected.songs) {
      playSound(selected.songs);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          placeholder="Search here..."
        />
        {searchQuery !== '' && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
            <AntDesign name="close" size={20} color="#888" />
          </TouchableOpacity>
        )}
        
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.resultsContainer}
        data={searchResults}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSongPress(item.id, item.title, item.songs)}>
            <View style={styles.resultItem}>
              <Text>{item.title || 'Not Found'}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => playSound(item.songs)}>
                  <Entypo name="controller-play" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={stopSound}>
                  <MaterialCommunityIcons name="stop-circle-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '90%', 
  },
  input: {
    flex: 1,
    paddingVertical: 8, 
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 8,
    marginLeft: 5,
  },
  
  searchButton: {
    backgroundColor: '#B6BBC4',
    padding: 10,
    borderRadius: 35,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultsContainer: {
    marginTop: 20,
    borderWidth: 0.2,
    borderRadius: 6,
    padding: 20, 
    width: '100%',
    alignSelf: 'center', 
  },
  noResultsText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  resultItem: {
    padding: 15, 
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignSelf: 'center',}
    
});



export default SearchScreen;
