import React from 'react';
import { SafeAreaView } from 'react-native';
import HomeScreen from './HomeScreen'; // Certifique-se de que o caminho esteja correto

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
