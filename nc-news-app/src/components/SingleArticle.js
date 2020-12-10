import React, { Component } from 'react';
import { getSingleArticle } from '../api';
import { Link } from '@reach/router';
import moment from 'moment';
import CommentsList from './CommentsList';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import Vote from './Vote';
import styled from "styled-components";

const SingleArticleContainer = styled.section`
    margin: 1.5rem 0;
    padding: 5px 10px;
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 3px 6px 8px #888888;
    border-left: 5px solid green;
`

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
                    <SingleArticleContainer>
                        <div>
                            <p><Link to={`/${article.topic}/articles`}>{article.topic}</Link>. Posted by <Link to={`/users/${article.author}/articles`}>{article.author}</Link> {moment(article.created_at).fromNow()}</p>
                            <Vote votes={article.votes} article_id={article_id} />
                        </div>

                        <div>
                            <h2>{article.title}</h2>
                            <p>{article.body}</p>
                        </div>

                        <div>
                            <Link to={`/articles/${article.article_id}/comments`}><p>{article.comment_count}</p></Link>
                        </div>
                    </SingleArticleContainer>

                    <section>
                        <CommentsList articleId={article_id} />
                    </section>
                </main>

            );
        }
    }
}

export default SingleArticle;