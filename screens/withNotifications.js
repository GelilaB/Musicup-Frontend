import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

const withNotifications = (WrappedComponent, musicData) => {
  const WithNotifications = (props) => {
    const sendNotification = async (title, body) => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger: null,
      });
    };

    const handleSongPress = async (itemId, title, artist) => {
      console.log(`Pressed on song: ${title} (ID: ${itemId})`);

      const selected = musicData.find((item) => item.id === itemId);

      if (selected && selected.songs) {
        // Play the song logic

        // Send a notification when the song starts playing
        sendNotification('Now Playing', `${title} by ${artist}`);
      }
    };

    useEffect(() => {
      // Request for notification permissions here if required
    }, []);

    return (
      <WrappedComponent
        {...props}
        handleSongPress={handleSongPress}
        musicData={musicData}
      />
    );
  };

  return WithNotifications;
};

export default withNotifications;
