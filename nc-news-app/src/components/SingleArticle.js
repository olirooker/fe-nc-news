import React, { Component } from 'react';
import { getSingleArticle } from '../api';
import { Link } from '@reach/router';
import moment from 'moment';

class SingleArticle extends Component {
    state = {
        article: {},
        isLoading: true,
    };

    componentDidMount() {
        const { article_id } = this.props
        getSingleArticle(article_id).then(article => {
            this.setState({ article: article })
        });
    };

    render() {
        const { article } = this.state;

        return (
            <div>
                <section>
                    <div>
                        <p><Link to={`/${article.topic}/articles`}>{article.topic}</Link>. Posted by <Link to={`/users/${article.author}/articles`}>{article.author}</Link> {moment(article.created_at).fromNow()}</p>
                        <p>{article.votes}</p>
                    </div>

                    <div>
                        <h2>{article.title}</h2>
                        <p>{article.body}</p>
                    </div>

                    <div>
                        <Link to={`/articles/${article.article_id}/comments`}><p>{article.comment_count}</p></Link>
                    </div>
                </section>

                <section>
                    <h3>Comment Adder Here</h3>
                </section>

                <section>
                    <h3>Comments Here</h3>
                </section>
            </div>

        );
    }
}

export default SingleArticle;