import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Note {
  id: string;
  content: string;
}

interface NotesProps {
  videoId: string;
}

const Notes: React.FC<NotesProps> = ({ videoId }) => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const storageKey = `notes_${videoId}`;

 
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem(storageKey);
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    };
    loadNotes();
  }, [storageKey]);

 
  const saveNotes = async (updatedNotes: Note[]) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const addNote = () => {
    if (!note.trim()) return; 

    const newNote: Note = {
      id: Date.now().toString(),
      content: note,
    };

    saveNotes([...notes, newNote]);
    setNote(''); 
  };

  const renderNoteItem = ({ item }: { item: Note }) => (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderNoteItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a note..."
        value={note}
        onChangeText={setNote}
      />
      <TouchableOpacity style={styles.submitButton} onPress={addNote}>
        <Text style={styles.submitButtonText}>Add note</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    marginTop: 20,
    fontSize: 14,
  },
  noteItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  noteText: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
  submitButton: {
    backgroundColor: '#2B2D42',
    padding: 12,
    borderRadius: 12,
    marginBottom: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Notes;
