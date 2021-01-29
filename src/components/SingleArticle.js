import React, { Component } from 'react';
import { deleteArticle, getSingleArticle } from '../api';
import { Link } from '@reach/router';
import moment from 'moment';
import CommentsList from './CommentsList';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import Vote from './Vote';
import userAvatar from '../assets/nc-avatar-01.svg';
import { RiDeleteBin2Line } from 'react-icons/ri';
import articleStyle from './styles/article.module.css';
import cardStyle from './styles/card.module.css';
import buttonStyle from './styles/button.module.css';

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    hasError: false,
    errorMessage: '',
    isDeleted: false,
  };

  componentDidMount() {
    const { article_id } = this.props;
    getSingleArticle(article_id)
      .then((article) => {
        this.setState({ article, isLoading: false });
      })
      .catch((err) => {
        const {
          response: { status, statusText },
        } = err;
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
      isDeleted,
    } = this.state;
    const { article_id, user } = this.props;

    let topicClass;
    if (article.topic === 'cooking') topicClass = articleStyle.topicCooking;
    else if (article.topic === 'football')
      topicClass = articleStyle.topicFootball;
    else if (article.topic === 'coding') topicClass = articleStyle.topicCoding;
    else topicClass = articleStyle.topic;

    if (isLoading) {
      return <Loading />;
    } else if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return (
        <main>
          <div className={cardStyle.card}>
            {isDeleted ? (
              <div className={articleStyle.deletedArticleContainer}>
                <p>This article has been deleted! Go to:</p>

                <Link
                  to={`/users/${user.username}/articles`}
                  className={buttonStyle.deletedArticleBtn}
                >
                  My articles
                </Link>
                <Link to='/' className={buttonStyle.deletedArticleBtn}>
                  All topics
                </Link>
              </div>
            ) : (
              <div className={cardStyle.singleCard}>
                <div className={articleStyle.articleDetailsContainer}>
                  <div className={articleStyle.postDetailsContainer}>
                    <img
                      className={articleStyle.userAvatar}
                      src={userAvatar}
                      alt='user avatar'
                    />
                    <div className={articleStyle.postDetails}>
                      <Link
                        to={`/users/${article.author}/articles`}
                        className={articleStyle.author}
                      >
                        {article.author}
                      </Link>
                      <p className={articleStyle.time}>
                        {moment(article.created_at).fromNow()}
                      </p>
                    </div>
                  </div>
                  <h2 className={articleStyle.title}>{article.title}</h2>
                  <p className={articleStyle.articleBody}>{article.body}</p>
                  <div className={articleStyle.tagsContainer}>
                    <Link
                      to={`/${article.topic}/articles`}
                      className={topicClass}
                    >
                      #{article.topic}
                    </Link>
                    <Link
                      to={`/articles/${article.article_id}`}
                      className={articleStyle.comments}
                    >
                      {article.comment_count} Comments
                    </Link>
                  </div>
                </div>

                <div className={articleStyle.singleArticleReactions}>
                  <div className={articleStyle.votes}>
                    <Vote
                      votes={article.votes}
                      article_id={article.article_id}
                    />
                  </div>
                </div>

                <div>
                  {article.author === user.username ? (
                    <button
                      onClick={this.handleClick}
                      className={buttonStyle.deleteButton}
                    >
                      <RiDeleteBin2Line />
                    </button>
                  ) : (
                    <p hidden>cannot delete</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <section>
            <CommentsList article_id={article_id} user={user} />
          </section>
        </main>
      );
    }
  }
}

export default SingleArticle;
