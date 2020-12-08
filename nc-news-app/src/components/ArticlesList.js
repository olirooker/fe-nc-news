import React, { Component } from 'react';
import ArticleCard from './ArticleCard';

class ArticlesList extends Component {
    state = {
        articles: [
            {
                article_id: 1,
                title: 'title 1',
                body: 'body 1',
                topic: 'cooking',
                author: 'person',
                votes: 100,
                created_at: '2020/12/08 15.30',
                comment_count: '2'
            },
            {
                article_id: 2,
                title: 'title 2',
                body: 'body 2',
                topic: 'coding',
                author: 'person_again',
                votes: 12,
                created_at: '2019/11/07 09.45',
                comment_count: '45'
            },
            {
                article_id: 3,
                title: 'title 3',
                body: 'body 3',
                topic: 'football',
                author: 'Forest_Gump',
                votes: 1000,
                created_at: '2018/01/02 12.34',
                comment_count: '34'
            },
        ]
    };

    render() {
        const { topic, author, username } = this.props

        return (
            <main>
                <h1>{topic || author || username || 'Articles List'}</h1>
                <p>Articles List - Filter section here (votes, date, etc)</p>
                {this.state.articles.map(article => {
                    return (
                        <ArticleCard article={article} key={article.article_id} />
                    )
                })}
            </main>
        );
    }
}

export default ArticlesList;