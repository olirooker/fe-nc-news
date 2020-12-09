import React, { Component } from 'react';
import { getSingleArticle } from '../api';
import { Link } from '@reach/router';
import moment from 'moment';
import CommentsList from './CommentsList';

class SingleArticle extends Component {
    state = {
        article: {},
        isLoading: true,
        hasError: false,
        errorMessage: '',
    };

    componentDidMount() {
        const { article_id } = this.props
        getSingleArticle(article_id).then(article => {
            this.setState({ article: article })
        })
        // .catch((err) => {
        //     console.log(err);
        //     const {response: {status, statusText}} = err;
        //     this.setState({
        //         hasError: true,
        //         errorMessage: `Article not found ${status}. ${statusText}`
        //     })
        // })
    };

    render() {
        const { article } = this.state;
        const { article_id } = this.props;

        return (
            <main>
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
                    <CommentsList articleId={article_id} />
                </section>
            </main>

        );
    }
}

export default SingleArticle;