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

export const getArticles = (topic) => {
    return ncNewsApi.get('/articles', {
        params: {
            topic: topic,
        }
    })
        .then(({ data }) => {
            return data.articles
        })
};

export const getSingleArticle = (article_id) => {
    return ncNewsApi.get(`/articles/${article_id}`)
        .then(({ data }) => {
            return data.article
        })
};