import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Setting = ({ navigation }) => {
 
  return (
    <ImageBackground
    source={require('../assets/images/bc1.png')} 
    style={styles.background}
  >
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.sectionContent}>
          This is Musicup !!!!!!!!!!!!
        </Text>
      </View>

     
    </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
    width: '100%', 
    paddingTop: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', 
    paddingTop: 100,
  },
  section: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', 
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
  },
  inviteButton: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});


export default Setting;
