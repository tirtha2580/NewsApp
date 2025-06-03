import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const fallbackImage = 'https://via.placeholder.com/400x200.png?text=No+Image';

const NewsCard = ({ article, onPress }) => {
  const imageUrl = article.image_url ? article.image_url : fallbackImage;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.title}>{article.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
  },
  image: {
    height: 200,
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default NewsCard;
