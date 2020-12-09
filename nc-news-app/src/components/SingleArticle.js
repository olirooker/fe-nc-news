import React, { Component } from 'react';
import { getSingleArticle } from '../api';
import { Link } from '@reach/router';
import moment from 'moment';
import CommentsList from './CommentsList';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

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
            this.setState({ article, isLoading: false })
        })
            .catch((err) => {
                // console.dir(err);
                const { response: { status, statusText } } = err;
                // console.log(status)
                // console.log(statusText)
                this.setState({
                    hasError: true,
                    errorMessage: `Article not found ${status}. ${statusText}`,
                    isLoading: false,
                })
            })
    };

    render() {
        const { article, isLoading, hasError, errorMessage } = this.state;
        const { article_id } = this.props;

        if (isLoading) {
            return <Loading />
        } else if (hasError) {
            return <ErrorMessage errorMessage={errorMessage} />
        } else {
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
}

export default SingleArticle;