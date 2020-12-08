import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticleCard from './ArticleCard';

class ArticlesList extends Component {
    state = {
        articles: [],
    };

    componentDidMount() {
        getArticles().then((articles) => {
            this.setState({ articles });
        });
    };

    render() {
        const { topic, author, username } = this.props

        return (
            <main>
                <h1>{topic || author || username || 'Articles List'}</h1>
                <p>Articles List - Filter section here (votes, date, etc)</p>
                {this.state.articles.map(article => {
                    return (
                        <ArticleCard articleData={article} key={article.article_id} />
                    )
                })}
            </main>
        );
    }
}

export default ArticlesList;