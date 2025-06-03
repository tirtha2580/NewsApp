import React, { createContext, useContext, useState, ReactNode } from 'react';

const BookmarkContext = createContext(null);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  const addBookmark = (article) => {
    setBookmarkedArticles((prev) => [...prev, article]);
  };

  const removeBookmark = (link) => {
    setBookmarkedArticles((prev) =>
      prev.filter((article) => article.link !== link)
    );
  };

  const isBookmarked = (link) => {
    return bookmarkedArticles.some((article) => article.link === link);
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedArticles, addBookmark, removeBookmark, isBookmarked }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);
