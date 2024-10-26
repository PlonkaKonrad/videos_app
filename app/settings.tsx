import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BELL = require('@/assets/notification-icon.svg');
const CLOCK = require('@/assets/clock-icon.svg');

const Settings: React.FC = () => {
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState<Date | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedReminderEnabled = await AsyncStorage.getItem('reminderEnabled');
        const storedReminderTime = await AsyncStorage.getItem('reminderTime');

        if (storedReminderEnabled !== null) {
          setIsReminderEnabled(JSON.parse(storedReminderEnabled));
        }
        if (storedReminderTime !== null) {
          setReminderTime(new Date(storedReminderTime));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  const saveSettings = async (enabled: boolean, time: Date) => {
    try {
      await AsyncStorage.setItem('reminderEnabled', JSON.stringify(enabled));
      await AsyncStorage.setItem('reminderTime', time.toISOString());
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const toggleReminder = () => {
    const newReminderEnabled = !isReminderEnabled;
    setIsReminderEnabled(newReminderEnabled);
    saveSettings(newReminderEnabled, reminderTime ?? new Date());
  };

  const renderReminderTime = () => {
    return (
      <View style={styles.titleWrapper}>
        <Image source={CLOCK} style={styles.icon} />
        <Text style={styles.label}>{reminderTime ? reminderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Not set'}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.titleWrapper}>
        <Image source={BELL} />
        <Text>Learning reminders</Text>
      </View>

      <View style={styles.reminderContainer}>
        <Text style={styles.label}>Repeat every day at:</Text>
        {renderReminderTime()}
        <Switch value={isReminderEnabled} onValueChange={toggleReminder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 20,
  },
  reminderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
  },
});

export default Settings;
