import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo,Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import randomImage from '../assets/images/randomImage';

import PlayList from './PlayList';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  const navigation = useNavigation();
  const [likedSongs, setLikedSongs] = useState({});
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState();

  const musicData = [
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
async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('../assets/audio/musicp.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleLike = (itemId) => {
    setLikedSongs((prevLikedSongs) => ({
      ...prevLikedSongs,
      [itemId]: !prevLikedSongs[itemId],
    }));
  };
  

  <PlayList
  likedSongs={likedSongs}
  handleLike={handleLike}
  
/>
  const handleShare = async (artist, title) => {
    try {
      const shareOptions = {
        message: `Check out the ${artist} in recommendation list 
      amazing work called ${title} ... it's 👌`, 
      };
      await Share.share(shareOptions);
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };
  const stopSound = async () => {
    if (sound) {
      console.log('Stopping Sound');
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };
  const playPauseSound = async () => {
    if (sound) {
      if (isPlaying) {
        console.log('Pausing Sound');
        await sound.pauseAsync();
      } else {
        console.log('Resuming Sound');
        await sound.playAsync();
      }
      setIsPlaying((prevState) => !prevState);
    }
  };

  const handleSongPress = async (itemId, title, songs) => {
    console.log(`Pressed on song: ${title} (ID: ${itemId})`);

    const selected = musicData.find((item) => item.id === itemId);
    setSelectedSong(selected);

    if (selected && selected.songs) {
      const { sound } = await Audio.Sound.createAsync(selected.songs);
      setSound(sound);

      console.log('Playing Sound');
      await sound.playAsync();
      setIsPlaying(true);
    }
  };
  const renderMusicItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSongPress(item.id, item.title, item.songs)}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 13, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Image source={item.image} style={{ width: 70, height: 70, marginRight: 10, borderRadius: 5 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>{item.artist}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => handleLike(item.id)} style={{ padding: 5 }}>
            {likedSongs[item.id] ? (
              <AntDesign name="heart" size={24} color="black" />
            ) : (
              <AntDesign name="hearto" size={24} color="black" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShare(item.id, item.title)} style={{ padding: 5 }}>
            <MaterialIcons name="share" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    
    <View style={{ flex: 1 }}>
       <View className= "flex-row justify-center items-center bg-black rounded-xl mx-4 mb-0">
            <Image source={randomImage()}  className="w-50 h-60" />
        </View>
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', padding: 9, backgroundColor: 'rgba(0, 0, 0, 0.6)' ,marginBottom: 20 }}>
        Suggested Hits
      </Text> 
    <FlatList
    data={musicData}
    renderItem={renderMusicItem}
    keyExtractor={(item) => item.id.toString()}
  />

  {selectedSong && (
    <TouchableOpacity onPress={() => handleSongPress(selectedSong.id, selectedSong.title)}>
      <View style={{ padding: 10, borderTopWidth: 5, borderTopColor: 'gray',borderRadius: 50 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 5, borderBottomColor: 'gray',borderRadius: 50 }}>
          <Image
            source={selectedSong.image}
            style={{ width: 50, height: 50, marginRight: 10, borderRadius: 50 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{selectedSong.title}</Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>{selectedSong.artist}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            
      {selectedSong && (
        
          <TouchableOpacity onPress={handleSongPress}>
           <TouchableOpacity onPress={playPauseSound} style={{ padding: 5 }}>
                      {isPlaying ? (
                        <Entypo name="controller-paus" size={24} color="black" />
                      ) : (
                  <TouchableOpacity onPress={stopSound} style={{ padding: 5 }}>
                 <Entypo name="controller-play" size={24} color="black" />
                </TouchableOpacity>
                )}
              </TouchableOpacity>
          </TouchableOpacity>
       
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )}
</View>
  );
}

export default HomeScreen;
