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
        console.log(topic, author, username)
        getArticles(topic, username).then((articles) => {
            this.setState({ articles, isLoading: false });
        });
    };

    // componentDidUpdate for the drop down list in the nav? for when the props change.

    render() {
        const { articles, isLoading } = this.state;
        const { topic, author, username } = this.props;

        // console.log(topic, author, username)

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