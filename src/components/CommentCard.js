import React, { Component } from 'react';
import { Link } from '@reach/router';
import moment from 'moment';
import Vote from './Vote';
import { deleteComment } from '../api';
import ErrorMessage from './ErrorMessage';
import { RiDeleteBin2Line } from 'react-icons/ri';
import cardStyle from './styles/card.module.css';
import articleStyle from './styles/article.module.css';
import buttonStyle from './styles/button.module.css';

class CommentCard extends Component {
  state = {
    username: 'jessjelly',
    hasError: false,
    errorMessage: '',
  };

  handleClick = (event) => {
    const { comment_id } = this.props.commentData;
    const { removeComment } = this.props;

    console.log(comment_id);
    deleteComment(comment_id)
      .then((comment) => {
        removeComment(comment_id);
      })
      .catch((err) => {
        const {
          response: { status, statusText },
        } = err;
        console.dir(err);
        this.setState({
          hasError: true,
          errorMessage: `Unable to delete comment ... ${status}. ${statusText}`,
        });
      });
  };

  render() {
    const { commentData } = this.props;
    const { username, hasError, errorMessage } = this.state;

    if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return (
        <div className={cardStyle.commentCard}>
          <div className={cardStyle.singleCard}>
            <div className={articleStyle.articleDetailsContainer}>
              <div className={articleStyle.postDetailsContainer}>
                <div className={articleStyle.postDetails}>
                  <Link to={`/users/${commentData.author}/articles`}>
                    {commentData.author}
                  </Link>
                  <p className={articleStyle.time}>
                    {moment(commentData.created_at).fromNow()}
                  </p>
                </div>
              </div>
              <p className={articleStyle.body}>{commentData.body}</p>
            </div>

            <div className={articleStyle.reactions}>
              <Vote
                votes={commentData.votes}
                comment_id={commentData.comment_id}
              />
            </div>
            <div>
              {commentData.author === username ? (
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
        </div>
      );
    }
  }
}

export default CommentCard;
