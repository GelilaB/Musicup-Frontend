import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image,StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EntryAll() {
  const navigation = useNavigation();
  const handleGoPress = () => {
    navigation.navigate('Login'); 
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleButtonClick = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'relative', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 30, marginTop: 100, padding: 45 }}>
        Music is life itself, Let's get started
      </Text>
      <Animated.Image
        source={require('../assets/images/wow.png')}
        style={{
          height: 300,
          width: 300,
          opacity: fadeAnim,
        }}
      />
      <TouchableOpacity>
        <View style={{ position: 'relative', left: 75 }}>
          <TouchableOpacity style={[styles.customButton, styles.relativeButton]} onPress={handleButtonClick}>
            <Text style={{ color: 'white', fontSize: 16 }}>Go</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  customButton: {
    backgroundColor: 'gold',
    padding: 10,
    borderRadius: 8,
    width: 50,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  relativeButton: {
    position: 'relative',
    left: 20,
  },
});
