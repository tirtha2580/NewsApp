import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchGlobalCategory } from '../api/newsApi';
import NewsCard from '../components/NewsCard';

const { width } = Dimensions.get('window');

const categories = [
  'top',
  'sports',
  'technology',
  'health',
  'business',
  'science',
  'entertainment',
];

const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('top');

  const loadNews = async (category = 'top') => {
    setRefreshing(true);
    try {
      const data = await fetchGlobalCategory(category);
      setArticles(data);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNews(selectedCategory);
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6200ea" />

      {/* Header */}
      <View style={styles.header} >
        <Text style={styles.headerTitle}>🗞 Global News</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Icon name="search" size={22} color="#6200ea" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Bookmarks')}
          >
            <Icon name="bookmark" size={22} color="#6200ea" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryItem,
                  isSelected && styles.categorySelected,
                ]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextSelected,
                  ]}
                >
                  {cat.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* News List */}
      <FlatList
        data={articles}
        keyExtractor={(item) => item.link}
        renderItem={({ item }) => (
          <NewsCard
            article={item}
            onPress={() => navigation.navigate('Article', { article: item })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 5 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadNews(selectedCategory)}
            colors={['#6200ea']}
          />
        }
        ListEmptyComponent={
          !refreshing && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No news found for this category.</Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
  },

  header: {
    paddingTop: 35,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#6200ea',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.5,
  },

  headerButtons: {
    flexDirection: 'row',
  },

  iconButton: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
    elevation: 3,
    shadowColor: '#6200ea',
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },

  categoryWrapper: {
    marginTop: 10,
    paddingVertical: 5,
  },

  categoryList: {
    paddingHorizontal: 14,
  },

  categoryItem: {
    backgroundColor: '#e4e7f2',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  categorySelected: {
    backgroundColor: '#6200ea',
  },

  categoryText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },

  categoryTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },

  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
