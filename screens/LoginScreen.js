import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginPress = async () => {
        if (email.trim() !== '' && password.trim() !== '') {
            const userDatas = {
                email,
                password,
            };
    
            try {
                const response = await fetch("http://192.168.137.1:5001/login", {
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
    
                if (responseData.status === 'ok') {
                    navigation.navigate('Home');
                } else {
                    alert('User does not exist. Please check your credentials.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error during login. Please try again.');
            }
        } else {
            
            alert('Please fill in all required fields.');
        }
    };

    

    return (
        <View className="bg-white h-full w-full">
            <StatusBar style="light" />
            <Image className="h-full w-full absolute" source={require('../assets/images/background.png')} />

            <View className="flex-row justify-around w-full absolute">
                <Animated.Image
                    entering={FadeInUp.delay(200).duration(1000).springify()}
                    source={require('../assets/images/pic2.png')}
                    className="h-[200] w-[200]"
                />
            </View>

            {/* title and form */}
            <View className="h-full w-full flex justify-around pt-40 pb-5">

                {/* title */}
                <View className="flex items-center">
                    <Animated.Text
                        entering={FadeInUp.duration(1000).springify()}
                        className="text-black font-bold tracking-wider text-3xl">
                        Login
                    </Animated.Text>
                </View>

                {/* form */}
                <View className="flex items-center mx-5 space-y-4">
                    <Animated.View
                        entering={FadeInDown.duration(1000).springify()}
                        className="bg-black/5 p-5 rounded-2xl w-full">

                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={'gray'}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </Animated.View>
                    <Animated.View
                        entering={FadeInDown.delay(200).duration(1000).springify()}
                        className="bg-black/5 p-5 rounded-2xl w-full mb-3">

                        <TextInput
                            placeholder="Password"
                            placeholderTextColor={'gray'}
                            secureTextEntry
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </Animated.View>

                    <Animated.View
                        className="w-full"
                        entering={FadeInDown.delay(400).duration(1000).springify()}
                    >
                        <TouchableOpacity onPress={handleLoginPress} className="w-full bg-yellow-300 p-3 rounded-3xl mb-3">
                            <Text className="text-xl font-bold text-black text-center">Login</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View
                        entering={FadeInDown.delay(600).duration(1000).springify()}
                        className="flex-row justify-center">

                        <Text>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.push('Signup')}>
                            <Text className="text-sky-600">SignUp</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </View>
    )
}
