import React, { Component } from 'react';
import { deleteArticle, getSingleArticle } from '../api';
import { Link, navigate } from '@reach/router';
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
        username: 'jessjelly',
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

    componentDidUpdate(prevProps, prevState) {
        const { article_id } = this.props;
        const { username } = this.state;
        // const newArticle = prevProps.article !== this.props.article;

        console.log('hello')

        // if (newArticle) {
        //     // navigate(`/users/${username}/articles`)
        // }
    };

    handleClick = (event) => {
        const { article_id } = this.state.article;
        const { username } = this.state;
        const { removeArticle } = this.props;
        console.log(article_id);

        deleteArticle(article_id).then((article) => {
            // this.setState({ article: {}, }) setState isDeleted true
            navigate(`/users/${username}/articles`)
        })
            .catch((err) => {
                const { response: { status, statusText } } = err;
                console.dir(err);
                this.setState({
                    hasError: true,
                    errorMessage: `Unable to delete article ... ${status}. ${statusText}`,
                })
            })
    };

    render() {
        const { article, isLoading, hasError, errorMessage, username } = this.state;
        const { article_id } = this.props;

        // if isDeleted true load delete message with options to Link to other places.

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
                        <div>
                            {article.author === username ? <button onClick={this.handleClick}>Delete Article</button> : <p hidden>cannot delete</p>}
                        </div>
                    </SingleArticleContainer>

                    <section>
                        <CommentsList article_id={article_id} />
                    </section>
                </main>

            );
        }
    }
}

export default SingleArticle;