import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';



export default function SignupScreen() {
    const EMAIL_PLACEHOLDER = "Email";
const PASSWORD_PLACEHOLDER = "Password";
const USERNAME_PLACEHOLDER = "Username";

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSignupPress = async () => {
     if (email.trim() !== ''  && name.trim() !=='' && password.trim() !== '') {
        const userDatas = {
            name,
            email,
            password,
        };

        try {
            const response = await fetch("http://192.168.137.1:5001/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDatas),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData);

            navigation.navigate('Login');
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        
        alert('Please fill in all required fields.');
    }
    };

      const handleName = (text) => {
        setName(text);
    };

    const handleEmail = (text) => {
        setEmail(text);
    };

    const handlePassword = (text) => {
        setPassword(text);
    };
  return (
    <View className="bg-white h-full w-full">
      <StatusBar style="light" />
      <Image className="h-full w-full absolute" source={require('../assets/images/background.png')} />

   
      <View className="flex-row justify-around w-full absolute">
      
        <Animated.Image 
            entering={FadeInUp.delay(400).duration(1000).springify()} 
            source={require('../assets/images/pic.png')} 
            className="h-[290] w-[180] opacity-85" 
        />
      </View>

      {/* title and form */}
      <View  className="h-full w-full flex justify-around pt-48">
        
        {/* title */}
        <View className="flex items-center">
            <Animated.Text 
                entering={FadeInUp.duration(1000).springify()} 
                className="text-white font-bold tracking-wider text-5xl">
                    Sign Up
            </Animated.Text>
        </View>

        {/* form */}
        <View className="flex items-center mx-5 space-y-4">
            <Animated.View 
                entering={FadeInDown.duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                    placeholder={USERNAME_PLACEHOLDER}
                    placeholderTextColor={'gray'}
                    value={name}
                    onChangeText={handleName}
                />
            </Animated.View>
            <Animated.View 
                entering={FadeInDown.delay(200).duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                    placeholder={EMAIL_PLACEHOLDER}
                    placeholderTextColor={'gray'}
                    value={email}
                    onChangeText={handleEmail}
                />
            </Animated.View>
            <Animated.View 
                entering={FadeInDown.delay(400).duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                <TextInput
                  placeholder={PASSWORD_PLACEHOLDER}
                  placeholderTextColor={'gray'}
                  secureTextEntry
                  value={password}
                  onChangeText={handlePassword}
                />
            </Animated.View>

            <Animated.View onPress={handleSignupPress}  className="w-full" entering={FadeInDown.delay(600).duration(1000).springify()}>
            <TouchableOpacity onPress={handleSignupPress} entering={FadeInDown.delay(600).duration(1000).springify()} className="w-full bg-yellow-300 p-3 rounded-2xl mb-3">
            <Text className="text-xl font-bold text-white text-center">SignUp</Text>
          </TouchableOpacity>
            </Animated.View>

            <Animated.View 
                entering={FadeInDown.delay(800).duration(1000).springify()} 
                className="flex-row justify-center">

                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={()=> navigation.push('Login')}>
                    <Text className="text-sky-600">Login</Text>
                </TouchableOpacity>

            </Animated.View>
        </View>
      </View>
    </View>
  )
}