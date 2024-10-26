import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmitEditing = () => {
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="magnify" size={24} color="#B0B0B0" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search videos"
        placeholderTextColor="#B0B0B0"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSubmitEditing}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderColor: '#000',
    borderWidth: 2,
    flex: 1,
  },
  icon: {
    marginRight: 10,
    color: '#000',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
});

export default SearchBar;
