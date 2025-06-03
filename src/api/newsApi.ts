// src/api/newsApi.ts
import axios from 'axios';
import { NEWSDATA_API_KEY } from '../utils/constants';

const languages = ['en', 'hi', 'bn']; // English, Hindi, Bengali

export const fetchGlobalCategory = async (category: string, language = 'en') => {
  const response = await axios.get('https://newsdata.io/api/1/news', {
    params: {
      apikey: NEWSDATA_API_KEY,
      category,
      language,
    },
  });
  return response.data.results;
};
export const searchNews = async (query: string) => {
  const allResults: any[] = [];

  for (const lang of languages) {
    const response = await axios.get('https://newsdata.io/api/1/news', {
      params: {
        apikey: NEWSDATA_API_KEY,
        q: query,
        language: lang,
      },
    });
    if (response.data.results) {
      allResults.push(...response.data.results);
    }
  }

  return allResults;
};
