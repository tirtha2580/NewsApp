// src/screens/SearchScreen.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
  Text,
} from 'react-native';
import { searchNews } from '../api/newsApi';
import NewsCard from '../components/NewsCard';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    Keyboard.dismiss();
    try {
      const data = await searchNews(query);
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search global news..."
          placeholderTextColor="#888"
          style={styles.input}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {results.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Try searching for a topic 🔍</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.link}
          renderItem={({ item }) => (
            <NewsCard
              article={item}
              onPress={() => navigation.navigate('Article', { article: item })}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  searchButton: {
    backgroundColor: '#6200ea',
    marginLeft: 10,
    padding: 12,
    borderRadius: 30,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default SearchScreen;
