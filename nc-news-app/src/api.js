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

export const getArticles = (topic, username, order, sort_by) => {
    return ncNewsApi.get('/articles', {
        params: {
            topic: topic,
            author: username,
            order,
            sort_by,
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

export const getArticleComments = (article_id, order, sort_by) => {
    return ncNewsApi.get(`/articles/${article_id}/comments`, {
        params: {
            order,
            sort_by,
        }
    })
        .then(({ data }) => {
            // console.log(data.comments)
            return data.comments
        })
};

export const updateArticleVote = (article_id, num) => {
    return ncNewsApi.patch(`/articles/${article_id}`, { inc_votes: num })
        .then(({ data }) => {
            return data.article
        })
};

export const updateCommentVote = (comment_id, num) => {
    return ncNewsApi.patch(`/comments/${comment_id}`, { inc_votes: num })
        .then(({ data }) => {
            console.log(data)
            return data.comment
        })
};

export const postComment = (newComment, article_id) => {
    return ncNewsApi.post(`/articles/${article_id}/comments`, newComment)
        .then(({ data }) => {
            return data.comment
        })
};