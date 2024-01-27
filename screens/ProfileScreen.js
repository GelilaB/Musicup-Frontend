import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button, ImageBackground } from 'react-native';

const ProfileScreen = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: 'Gelila',
    email: 'gelila@email.com',
    bio: '🎵 No Music No Life 🎧',
    
  });

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSaveChanges = () => {
 
    setShowEditModal(false);
  
    console.log('Edited profile saved:', editedProfile);
  };

  return (
    <ImageBackground
    source={require('../assets/images/bc2.png')} 
    style={styles.background}
  >
    <View style={styles.container}>
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
              <Button style={styles.cancelButton} title="Cancel" onPress={() => setShowEditModal(false)} />
              <Button style={styles.saveButton} title="Save Changes" onPress={handleSaveChanges} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
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
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileInfo: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
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
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: 'gold',
  },
  cancelButton: {
    backgroundColor: '#3498db',
  },
});
export default ProfileScreen;
