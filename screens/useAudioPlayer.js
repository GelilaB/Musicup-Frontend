import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';


const useAudioPlayer = () => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = async (audioFile) => {
    const { sound } = await Audio.Sound.createAsync(audioFile);
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
    setIsPlaying(true);
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

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return {
    playSound,
    stopSound,
    playPauseSound,
    isPlaying,
  };
};

export default useAudioPlayer;
