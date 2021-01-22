import React, { Component } from 'react';
import { deleteArticle, getSingleArticle } from '../api';
import { Link } from '@reach/router';
import moment from 'moment';
import CommentsList from './CommentsList';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import Vote from './Vote';
import styled from 'styled-components';

const SingleArticleContainer = styled.section`
  margin: 1.8rem 0;
  padding: 2rem;
  padding-top: 1.4rem;
  background-color: white;
  border: 1px solid #b5bdc4;
  border-radius: 1rem;
  box-shadow: 1.5px 3px 4px #888888;
  display: grid;
  grid-template-columns: auto 40px;
  grid-template-areas: 'content reactions';

  @media screen and (max-width: 600px) {
    border-radius: 0rem;
  }
`;
const Title = styled.h2`
  font-size: 3.6rem;
  font-weight: 600;
  color: #202428;
  margin-bottom: 3rem;
`;

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    hasError: false,
    errorMessage: '',
    username: 'jessjelly',
    isDeleted: false,
  };

  componentDidMount() {
    const { article_id } = this.props;
    getSingleArticle(article_id)
      .then((article) => {
        this.setState({ article, isLoading: false });
      })
      .catch((err) => {
        // console.dir(err);
        const {
          response: { status, statusText },
        } = err;
        // console.log(status)
        // console.log(statusText)
        this.setState({
          hasError: true,
          errorMessage: `Article not found ${status}. ${statusText}`,
          isLoading: false,
        });
      });
  }

  handleClick = (event) => {
    const { article_id } = this.state.article;

    deleteArticle(article_id)
      .then(() => {
        this.setState((currentState) => {
          return { article: {}, isDeleted: true };
        });

        // this.setState({ article: {}, isDeleted: true, })
      })
      .catch((err) => {
        const {
          response: { status, statusText },
        } = err;
        console.dir(err);
        this.setState({
          hasError: true,
          errorMessage: `Unable to delete article ... ${status}. ${statusText}`,
        });
      });
  };

  render() {
    const {
      article,
      isLoading,
      hasError,
      errorMessage,
      username,
      isDeleted,
    } = this.state;
    const { article_id } = this.props;

    if (isLoading) {
      return <Loading />;
    } else if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return (
        <main>
          <SingleArticleContainer>
            {isDeleted ? (
              <div>
                <p>This article has been deleted! Go to:</p>
                <Link to={`/users/${username}/articles`}>My articles</Link>
                <Link to='/'>All topics</Link>
              </div>
            ) : (
              <div>
                <div>
                  <p>
                    <Link to={`/${article.topic}/articles`}>
                      {article.topic}
                    </Link>
                    . Posted by{' '}
                    <Link to={`/users/${article.author}/articles`}>
                      {article.author}
                    </Link>{' '}
                    {moment(article.created_at).fromNow()}
                  </p>
                  <Vote votes={article.votes} article_id={article_id} />
                </div>

                <div>
                  <Title>{article.title}</Title>
                  <p>{article.body}</p>
                </div>

                <div>
                  <Link to={`/articles/${article.article_id}/comments`}>
                    <p>{article.comment_count}</p>
                  </Link>
                </div>
                <div>
                  {article.author === username ? (
                    <button onClick={this.handleClick}>Delete Article</button>
                  ) : (
                    <p hidden>cannot delete</p>
                  )}
                </div>
              </div>
            )}
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
