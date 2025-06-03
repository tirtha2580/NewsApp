import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarkContext = createContext();

export const useBookmarks = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    const saved = await AsyncStorage.getItem('bookmarked');
    setBookmarks(saved ? JSON.parse(saved) : []);
  };

  const addBookmark = async (article) => {
    const updated = [...bookmarks, article];
    setBookmarks(updated);
    await AsyncStorage.setItem('bookmarked', JSON.stringify(updated));
  };

  const removeBookmark = async (link) => {
    const updated = bookmarks.filter(item => item.link !== link);
    setBookmarks(updated);
    await AsyncStorage.setItem('bookmarked', JSON.stringify(updated));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
