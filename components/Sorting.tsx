import { Order, YouTubeOrder } from '@/types';
import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

interface SortingProps {
  order: string;
  setOrder: (order: Order) => void;
}

const options = [
  { slug: YouTubeOrder.Date , name: 'Date' },
  { slug: YouTubeOrder.Title, name: 'Title A - Z' },
  { slug: YouTubeOrder.ViewCount, name: 'Popularity' },
];

const Sorting: React.FC<SortingProps> = ({ order, setOrder }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find(option => option.slug === order);

  const handleSelectOption = (selectedSlug: Order) => {
    setOrder(selectedSlug);
    setModalVisible(false);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
      <Text style={styles.selectedOrder}>
        Sort by: <Text style={styles.currentSort}>{selectedOption?.name}</Text>
      </Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sort records by:</Text>
            {options.map(option => (
              <TouchableOpacity
                key={option.slug}
                style={styles.optionButton}
                onPress={() => handleSelectOption(option.slug)}
              >
                <Text style={styles.optionText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.confirmButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.confirmButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  selectedOrder: {
    fontSize: 12,
    color: '#333',
    textAlign: 'right',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#8D99AE',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
  optionButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff', 
  },
  optionText: {
    fontSize: 16,
    color: '#fff', 
  },
  confirmButton: {
    backgroundColor: '#2B2D42',
    padding: 12,
    borderRadius: 12,
    marginTop: 50,
  },
  confirmButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  currentSort: {
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Sorting;
