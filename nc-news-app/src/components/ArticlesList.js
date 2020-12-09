import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticleCard from './ArticleCard';
import Loading from './Loading';


class ArticlesList extends Component {
    state = {
        articles: [],
        isLoading: true,
    };

    componentDidMount() {
        const { topic, author, username } = this.props;
        console.log(topic)
        getArticles(topic, username).then((articles) => {
            this.setState({ articles, isLoading: false });
        });
    };

    componentDidUpdate(prevProps) {
        const { topic, username } = this.props;
        const newTopic = prevProps.topic !== this.props.topic;
        const newUsername = prevProps.username !== this.props.username;
        // const newUri = prevProps.uri !== this.props.uri

        if (newTopic || newUsername) {
            getArticles(topic, username).then((articles) => {
                this.setState({ articles });
            });
        }
    };

    render() {
        const { articles, isLoading } = this.state;
        const { topic, author, username } = this.props;

        return (
            <main>
                <h1>{topic || author || username || 'Articles List'}</h1>
                <p>Articles List - Filter section here (votes, date, etc)</p>
                {isLoading ? (
                    <Loading />
                ) : (
                        <ul>
                            {articles.map(article => {
                                return (
                                    <ArticleCard articleData={article} key={article.article_id} />
                                )
                            })}
                        </ul>
                    )}
            </main>
        );
    }
}

export default ArticlesList;