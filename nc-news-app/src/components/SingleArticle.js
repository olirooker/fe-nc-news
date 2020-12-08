import React, { Component } from 'react';

class SingleArticle extends Component {

    componentDidMount() {
        const { article_id } = this.props
    };

    render() {
        return (
            <div>
                <h2>Single Article</h2>
                <h3>{this.props.article_id}</h3>
            </div>
        );
    }
}

export default SingleArticle;