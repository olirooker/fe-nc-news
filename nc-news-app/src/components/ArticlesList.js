import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticleCard from './ArticleCard';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import Query from './Query';

class ArticlesList extends Component {
    state = {
        articles: [],
        isLoading: true,
        hasError: false,
        errorMessage: '',
        order: 'desc',
        sort_by: 'created_at',
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

    componentDidUpdate(prevProps, currState) {
        const { topic, username } = this.props;
        const { order, sort_by } = this.state;
        const newTopic = prevProps.topic !== this.props.topic;
        const newUsername = prevProps.username !== this.props.username;
        const newOrder = currState.order !== this.state.order;
        const newSort = currState.sort_by !== this.state.sort_by;

        if (newTopic || newUsername || newOrder || newSort) {
            getArticles(topic, username, order, sort_by).then((articles) => {
                this.setState({ articles });
            });
        }
    };

    changeOrder = (newOrder) => {
        this.setState({ order: newOrder });
    };

    changeSort = (newSort) => {
        this.setState({ sort_by: newSort });
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
                    <Query changeOrder={this.changeOrder} changeSort={this.changeSort} />
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