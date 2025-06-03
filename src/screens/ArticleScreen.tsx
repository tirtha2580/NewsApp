import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import { useBookmarks } from '../context/BookmarkContext';

const ArticleScreen = ({ route }) => {
  const { article } = route.params;
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();

  const handleBookmarkToggle = () => {
    if (isBookmarked(article.link)) {
      removeBookmark(article.link);
    } else {
      addBookmark(article);
    }
  };

  const handleReadFullNews = () => {
    if (article.link) {
      Linking.openURL(article.link);
    }
  };

  const imageUrl =
    article.image_url || 'https://via.placeholder.com/300x200.png?text=No+Image';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{article.title}</Text>

      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />

      <Text style={styles.description}>
        {article.description || 'No description available.'}
      </Text>

      <View style={styles.buttonSpacing}>
        <Button
          title={isBookmarked(article.link) ? 'Remove Bookmark' : 'Add Bookmark'}
          onPress={handleBookmarkToggle}
        />
      </View>

      <Button title="Read Full News" onPress={handleReadFullNews} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonSpacing: {
    marginBottom: 12,
  },
});

export default ArticleScreen;
