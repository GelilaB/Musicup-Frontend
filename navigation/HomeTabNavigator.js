import React, { useState } from 'react';
import { Image, TouchableOpacity, Modal, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ArtistScreen from '../screens/ArtistScreen';
import GenreScreen from '../screens/GenreScreen';
import SearchScreen from '../screens/SearchScreen';
import PlayList from '../screens/PlayList';


const Tab = createBottomTabNavigator();

function HomeTabNavigator({ navigation }) {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const openOptionsMenu = () => {
    setShowOptionsMenu(true);
  };
  const handleSettingPress = () => {
    closeOptionsMenu();
    navigation.navigate('settings');
  };
  const closeOptionsMenu = () => {
    setShowOptionsMenu(false);
  };

  const handleLogoutPress = () => {
    navigation.navigate('Entry');
    closeOptionsMenu();
  };

  return (
    <View style={{ flex: 1 }}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showOptionsMenu}
        onRequestClose={closeOptionsMenu}
      >
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onPress={closeOptionsMenu}
        >
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>

            <TouchableOpacity onPress={handleSettingPress}>
              <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 10 }}>Setting</Text>
            </TouchableOpacity>

           
            <TouchableOpacity onPress={handleLogoutPress}>
              <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 10 }}>Logout</Text>
            </TouchableOpacity>
            
          </View>
        </TouchableOpacity>
      </Modal>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            // Define your tabBarIcons here
            let iconSource;
            return (
              <Image
                source={iconSource}
                style={{ width: 25, height: 25 }}
              />
            );
          },
          headerRight: () => (
            <TouchableOpacity onPress={openOptionsMenu} style={{ position: 'absolute', top: 10, right: 10 }}>
              <Ionicons name="ellipsis-vertical" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      >
 <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../assets/images/home_active.png') : require('../assets/images/home.png')}
              style={{ width: 25, height: 25,  }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Artists"
        component={ArtistScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../assets/images/earphone1.png') : require('../assets/images/articst.png')}
              style={{ width: 25, height: 25,  }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../assets/images/Search_inactive.png') : require('../assets/images/searcher.png')}
              style={{ width: 25, height: 25, }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Genre"
        component={GenreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="note" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Playlist"
        component={PlayList}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../assets/images/ear2.jpg') : require('../assets/images/player.png')}
              style={{ width: 25, height: 25,  }}
            />
          ),
        }}
      />
    
    </Tab.Navigator>
    
    </View>
   
  );
}


export default HomeTabNavigator;
