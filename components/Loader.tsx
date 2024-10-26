import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface LoaderProps {
  isLoading: boolean;
  error: boolean;
  children?: React.ReactNode;
}

const Loader: React.FC<LoaderProps> = ({ isLoading, error, children }) => {
  const renderContent = () => {
    if (error) {
      return <Text style={styles.errorText}>Something went wrong</Text>;
    }

    if (isLoading) {
      return <ActivityIndicator size="large" color="#2B2D42" />;
    }

    if (!children) {
      return <Text style={styles.emptyText}>Nothing found</Text>;
    }

    return children;
  };

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: '#000',
  },
});

export default Loader;
