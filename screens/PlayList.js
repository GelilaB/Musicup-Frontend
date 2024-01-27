import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Dialog from 'react-native-dialog';


const PlayList = () => {
  const [playlists, setPlaylists] = useState([
    { id: 1, name: 'Favorites', songs: ['music1.mp3'] },
    { id: 2, name: 'AllTime', songs: ['music4.mp3', 'music6.mp3', 'musicp.mp3'] },
  ]);
  
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [availableSongs] = useState(['music1.mp3', 'music2.mp3', 'music3.mp3']);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const handleSongSelection = (song) => {
    if (selectedSongs.includes(song)) {
      setSelectedSongs(selectedSongs.filter((selectedSong) => selectedSong !== song));
    } else {
      setSelectedSongs([...selectedSongs, song]);
    }
  };
  const [likedSongs, setLikedSongs] = useState({});
  const handleLike = (song) => {
    setLikedSongs((prevLikedSongs) => ({
      ...prevLikedSongs,
      [song]: !prevLikedSongs[song],
    }))};
  
    const createPlaylist = async () => {
      if (newPlaylistName.trim() !== '') {
        try {
          const response = await fetch("http://192.168.137.1:5001/api/createPlaylist", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              newPlaylistName: newPlaylistName.trim(),
              selectedSongs: selectedSongs,
            }),
          });
        
          if (response.ok) {
           
            await response.json(); 
            const updatedPlaylists = await fetchUpdatedPlaylists(); 
            setPlaylists(updatedPlaylists); 
            setIsDialogVisible(false);
            setNewPlaylistName('');
            setSelectedSongs([]);
          } else {
        
            const errorResponse = await response.json();
            console.error('Failed to create playlist:', errorResponse.message);
            
          }
        } catch (error) {
          console.error('Error creating playlist:', error.message);
         
        }}};
        const fetchUpdatedPlaylists = async () => {
          try {
            const response = await fetch("http://192.168.137.1:5001/api/getPlaylists");
        
            if (response.ok) {
              const playlists = await response.json();
              console.log('Fetched playlists:', playlists);
              return playlists;
            } else {
              console.error('Failed to fetch playlists:', response.statusText);
              return [];
            }
          } catch (error) {
            console.error('Error fetching playlists:', error);
            return [];
          }
        };
  const [selectedPlaylistSongs, setSelectedPlaylistSongs] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handlePlaylistSelection = (playlist) => {
    setSelectedPlaylist(playlist);
    setSelectedPlaylistSongs(playlist.songs);
  };


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.playlistContainer}>
      {playlists.map((playlist) => (
  <TouchableOpacity
    key={playlist.id}
    style={styles.playlistBox}
    onPress={() => handlePlaylistSelection(playlist)}
  >
    <Text style={styles.playlistText}>{playlist.name}</Text>
  </TouchableOpacity>
))}
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={false}>
      {selectedPlaylistSongs.map((song, index) => (
  <TouchableOpacity key={index} style={styles.songBox}>
    <Text style={styles.songText}>{song}</Text>
  </TouchableOpacity>
))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => setIsDialogVisible(true)}>
        <Text style={styles.addButtonText}>Create Playlist</Text>
      </TouchableOpacity>
      

      {/* Dialog for creating a new playlist */}
      <Dialog.Container visible={isDialogVisible}>
        
        <Dialog.Description>Enter Your Playlist Name</Dialog.Description>
        <Dialog.Input
          onChangeText={(text) => setNewPlaylistName(text)}
          value={newPlaylistName}
          placeholder="Type name here"
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {availableSongs.map((song, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.songBox, selectedSongs.includes(song) && styles.selectedSongBox]}
              onPress={() => handleSongSelection(song)}
            >
              <Text style={[styles.songText, selectedSongs.includes(song) && styles.selectedSongText]}>
                {song}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Dialog.Button label="Cancel" onPress={() => setIsDialogVisible(false)} />
        <Dialog.Button label="Create" onPress={createPlaylist} />
      </Dialog.Container>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  playlistContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  playlistBox: {
    width: '45%', 
    aspectRatio: 1,
    backgroundColor: '#B6BBC4',
    padding: 45,
    borderRadius: 8,
    marginBottom: 20,
  },
  playlistText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#B6BBC4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createPlaylistContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  songSelectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  songBox: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
  },
  songText: {
    fontSize: 16,
  },
  selectedSongBox: {
    backgroundColor: 'lightblue',
  },
  selectedSongText: {
    fontWeight: 'bold',
  },
});

export default PlayList;
