import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticleCard from './ArticleCard';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import styled from 'styled-components';

const FilterQueries = styled.div`
margin: 1rem 0;
background-color: white;
`

class ArticlesList extends Component {
    state = {
        articles: [],
        isLoading: true,
        hasError: false,
        errorMessage: '',
        // sort_by: 'created_at',
        // order: 'desc'
    };

    componentDidMount() {
        const { topic, username } = this.props;

        getArticles(topic, username).then((articles) => {
            this.setState({ articles, isLoading: false });
        })
            .catch((err) => {
                const { response: { status, statusText } } = err;
                this.setState({
                    hasError: true,
                    errorMessage: `Article not found ${status}. ${statusText}`,
                    isLoading: false,
                })
            })
    };

    componentDidUpdate(prevProps) {
        const { topic, username } = this.props;
        const newTopic = prevProps.topic !== this.props.topic;
        const newUsername = prevProps.username !== this.props.username;

        if (newTopic || newUsername) {
            getArticles(topic, username).then((articles) => {
                this.setState({ articles });
            });
        }
    };

    render() {
        const { articles, isLoading, hasError, errorMessage } = this.state;
        // const { topic, author, username } = this.props;

        if (isLoading) {
            return <Loading />
        } else if (hasError) {
            return <ErrorMessage errorMessage={errorMessage} />
        } else {
            return (
                <main>
                    {/* <h1>{topic || author || username || 'Articles List'}</h1> */}
                    <FilterQueries>
                        <p>Articles List - Filter section here (votes, date, etc)</p>
                    </FilterQueries>
                    <ul>
                        {articles.map(article => {
                            return (
                                <ArticleCard articleData={article} key={article.article_id} />
                            )
                        })}
                    </ul>
                </main>
            );
        }
    }
}

export default ArticlesList;