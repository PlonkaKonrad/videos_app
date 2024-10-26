import { useRouter } from 'expo-router';
import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface SectionProps {
  title: string;
  linkText: string;
  linkHref: string;
  children: ReactNode;
}

const TopicSection: React.FC<SectionProps> = ({ title, linkText, linkHref, children }) => {
  const router = useRouter();
  const handleLinkPress = () => {
    router.push(`/search?query=${encodeURIComponent(title)}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={handleLinkPress} style={styles.linkContainer}>
          <Text style={styles.link}>{linkText}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.childrenContainer}>
          {children}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#000',
    borderBottomWidth: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2B2D42',
  },
  linkContainer: {
    padding: 5,
  },
  link: {
    fontSize: 12,
    color: '#2B2D42',
    textDecorationLine: 'underline',
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  childrenContainer: {
    flexDirection: 'row',  // Ensures horizontal layout
  },
});

export default TopicSection;
