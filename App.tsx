import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { BookmarkProvider } from './src/context/BookmarkContext';

const App = () => {
  return (
    <BookmarkProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </BookmarkProvider>
  );
};

export default App;
