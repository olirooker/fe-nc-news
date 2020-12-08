import axios from 'axios';

const ncNewsApi = axios.create({
    baseURL: 'https://ncoders-news-api.herokuapp.com/api',
});

export const getTopics = () => {
    return ncNewsApi.get('/topics')
        .then(({ data }) => {
            return data.topics
        })
};

export const getArticles = () => {
    return ncNewsApi.get('/articles')
        .then(({ data }) => {
            return data.articles
        })
};