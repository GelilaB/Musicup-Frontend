import React, { useState } from 'react';
import { Share } from 'react-native';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

const SettingScreen = ({ navigation }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: 'Geli',
    email: 'geli@email.com',
    bio: '🎵 No Music No Life 🎧',
    
  });

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("http://192.168.137.1:5001/update-user", {
        method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: editedProfile.email,
    newName: editedProfile.name,
    newEmail: editedProfile.email,
  }),
});

      const responseData = await response.json();

      if (response.status === 200) {
        console.log('Server response:', responseData);

        
        setEditedProfile(responseData.data);
      } else {
        console.error('Error updating user:', responseData);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }

    setShowEditModal(false);

  };
  


  const handleInviteFriends = async (artist, title) => {
    try {
      const shareOptions = {
        message: `Hey, I Recommend this App for you. Its Most Stylish Music app, You would Definitely Like It. Please Try it Out.`, 
      };
      await Share.share(shareOptions);
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };
  const handleAboutPress = () => {
    navigation.navigate('About');
  };

  return (
    <View style={styles.containerf}>
      <Text style={styles.heading}>Settings</Text>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/wow.png')}
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{editedProfile.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{editedProfile.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Bio:</Text>
          <Text style={styles.value}>{editedProfile.bio}</Text>
        </View>
        
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              value={editedProfile.name}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, name: text })}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              value={editedProfile.email}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, email: text })}
              placeholder="Email"
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              value={editedProfile.bio}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, bio: text })}
              placeholder="Bio"
              multiline={true}
              numberOfLines={4}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Cancel" onPress={() => setShowEditModal(false)} />
              <Button title="Save Changes" onPress={handleSaveChanges} />
            </View>
          </View>
        </View>
      </Modal>
    

      <View style={styles.boxContainer}>
        <View style={styles.box}>
        <TouchableOpacity style={styles.settingItem} onPress={handleAboutPress}>
            <Text>About</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.box}>
          <TouchableOpacity style={styles.settingItem} onPress={handleInviteFriends}>
            <Text>Invite Your Friends</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerf: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', 
    paddingTop: 90, 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  boxContainer: {
    width: '75%',
    paddingTop: 40,
  },
  box: {
    borderWidth: 1,
    borderColor: 'gold',
    borderRadius: 10,
    marginBottom: 20,
    padding: 5,
  },
  settingItem: {
    paddingVertical: 15,
    borderBottomColor: '#ccc',
    alignItems: 'right',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  editButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'gold',
    borderRadius: 5,
  },
  editButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  profileInfo: {
    borderWidth: 1,
    borderColor: 'gold',
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 20,
    padding: 10
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    width: '40%',
  },
  value: {
    width: '60%',
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    
  },
});


export default SettingScreen;
