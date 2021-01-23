import React, { Component } from 'react';
import { deleteArticle, getSingleArticle } from '../api';
import { Link } from '@reach/router';
import moment from 'moment';
import CommentsList from './CommentsList';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import Vote from './Vote';
import style from './styles/article.module.css';
import userAvatar from '../assets/nc-avatar-01.svg';

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

    let topicClass;
    if (article.topic === 'cooking') topicClass = style.topicCooking;
    else if (article.topic === 'football') topicClass = style.topicFootball;
    else if (article.topic === 'coding') topicClass = style.topicCoding;
    else topicClass = style.topic;

    if (isLoading) {
      return <Loading />;
    } else if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return (
        <main>
          <div className={style.card}>
            {isDeleted ? (
              <div>
                <p>This article has been deleted! Go to:</p>
                <Link to={`/users/${username}/articles`}>My articles</Link>
                <Link to='/'>All topics</Link>
              </div>
            ) : (
              <div className={style.singleCard}>
                <div className={style.articleDetailsContainer}>
                  <div className={style.postDetailsContainer}>
                    <img
                      className={style.userAvatar}
                      src={userAvatar}
                      alt='user avatar'
                    />
                    <div className={style.postDetails}>
                      <Link
                        to={`/users/${article.author}/articles`}
                        className={style.author}
                      >
                        {article.author}
                      </Link>
                      <p className={style.time}>
                        {moment(article.created_at).fromNow()}
                      </p>
                    </div>
                  </div>
                  <h2 className={style.title}>{article.title}</h2>
                  <p className={style.body}>{article.body}</p>
                  <div className={style.tagsContainer}>
                    <Link
                      to={`/${article.topic}/articles`}
                      className={topicClass}
                    >
                      #{article.topic}
                    </Link>
                    <Link
                      to={`/articles/${article.article_id}`}
                      className={style.comments}
                    >
                      {article.comment_count} Comments
                    </Link>
                  </div>
                </div>

                <div className={style.singleArticleReactions}>
                  <div className={style.votes}>
                    <Vote
                      votes={article.votes}
                      article_id={article.article_id}
                    />
                  </div>
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
          </div>

          <section>
            <CommentsList article_id={article_id} />
          </section>
        </main>
      );
    }
  }
}

export default SingleArticle;
