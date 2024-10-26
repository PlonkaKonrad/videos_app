import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';

const LOGO = require('@/assets/logo.svg');
const APP_ICON = require('@/assets/app-icon.svg');

const StartScreen: React.FC = () => {
  const router = useRouter();

  const handleGuestLogin = () => {
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Logo />
      <AppIcon />
      <WelcomeMessage />
      <TouchableOpacity style={styles.button} onPress={handleGuestLogin}>
        Log in as Guest
      </TouchableOpacity>
      <ConsentText />
    </View>
  );
};

const Logo: React.FC = () => (
  <Image source={LOGO} />
);

const AppIcon: React.FC = () => (
  <Image source={APP_ICON} />
);

const WelcomeMessage: React.FC = () => (
  <Text style={styles.paragraph}>
    Welcome to the best {'\n'} YouTube-based learning application.
  </Text>
);

const ConsentText: React.FC = () => (
  <Text style={styles.consents}>
    By continuing you agree with {'\n'}
    <Link href='/' style={styles.link}>Terms and Conditions</Link> and{' '}
    <Link href='/' style={styles.link}>Privacy Policy</Link>
  </Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#8D99AE',
    paddingHorizontal: 30,
  },
  paragraph: {
    fontSize: 22,
    lineHeight: 24,
    color: '#fff',
    marginBottom: 30,
    fontFamily: 'Poppins-SemiBold',
  },
  button: {
    backgroundColor: '#2B2D42',
    padding: 12,
    borderRadius: 12,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 30,
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    lineHeight: 24,
  },
  consents: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    lineHeight: 16,
  },
  link: {
    color: '#2B2D42',
    textDecorationLine: 'underline',
  },
});

export default StartScreen;
