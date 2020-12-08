import React, { Component } from 'react';
import ArticleCard from './ArticleCard';

class ArticlesList extends Component {
    state = {};

    render() {
        return (
            <div>
                <h1>Articles List</h1>
                <p>Articles List - List of article cards</p>
                <ArticleCard />
            </div>
        );
    }
}

export default ArticlesList;