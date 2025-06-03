// src/screens/BookmarkScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useBookmarks } from '../context/BookmarkContext';
import NewsCard from '../components/NewsCard';

const BookmarkScreen = ({ navigation }) => {
  const { bookmarkedArticles } = useBookmarks();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔖 Bookmarked Articles</Text>
      <FlatList
        data={bookmarkedArticles}
        keyExtractor={(item) => item.link}
        renderItem={({ item }) => (
          <NewsCard
            article={item}
            onPress={() => navigation.navigate('Article', { article: item })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No bookmarks yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  header: { fontSize: 22, fontWeight: 'bold', padding: 16 },
  empty: { textAlign: 'center', marginTop: 20, color: '#555' },
});

export default BookmarkScreen;
