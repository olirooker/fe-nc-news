import React, { Component } from 'react';
import { getArticleComments } from '../api';
import CommentAdder from './CommentAdder';
import CommentCard from './CommentCard';
import Loading from './Loading';
import Query from './Query';

class CommentsList extends Component {
  state = {
    comments: [],
    isLoading: true,
    order: 'desc',
    sort_by: 'created_at',
    hasError: false,
    errorMessage: '',
  };

  componentDidMount() {
    const { article_id } = this.props;

    getArticleComments(article_id)
      .then((comments) => {
        this.setState({ comments, isLoading: false });
      })
      .catch((err) => {
        const {
          response: { status, statusText },
        } = err;
        this.setState({
          hasError: true,
          errorMessage: `Comments not found ${status}. ${statusText}`,
          isLoading: false,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { article_id } = this.props;
    const { order, sort_by } = this.state;
    const newOrder = prevState.order !== this.state.order;
    const newSort = prevState.sort_by !== this.state.sort_by;

    if (newOrder || newSort) {
      getArticleComments(article_id, order, sort_by).then((comments) => {
        this.setState({ comments });
      });
    }
  }

  addComment = (newComment) => {
    // const { article_id } = this.props;

    this.setState((currentState) => {
      return { comments: [newComment, ...currentState.comments] };
    });

    // postComment(commentToAdd, article_id)
    //   .then((newComment) => {
    //     this.setState((currentState) => {
    //       return {
    //         comments: [newComment, ...currentState.comments],
    //       };
    //     });
    //   })
    //   .catch((err) => {
    //     const {
    //       response: { status, statusText },
    //     } = err;

    //     this.setState({
    //       hasError: true,
    //       errorMessage: `Cannot post comment ... ${status}. ${statusText}`,
    //     });
    //   });
  };

  changeOrder = (newOrder) => {
    this.setState({ order: newOrder });
  };

  changeSort = (newSort) => {
    this.setState({ sort_by: newSort });
  };

  removeComment = (comment_id) => {
    this.setState((previousState) => {
      const newComments = previousState.comments.filter((comment) => {
        return comment.comment_id !== comment_id;
      });
      const newState = {
        comments: newComments,
      };
      return newState;
    });
  };

  render() {
    const { comments, isLoading } = this.state;
    const { user, article_id } = this.props;

    return (
      <section>
        <section>
          <CommentAdder
            addComment={this.addComment}
            user={user}
            article_id={article_id}
          />
        </section>
        <Query changeOrder={this.changeOrder} changeSort={this.changeSort} />
        {isLoading ? (
          <Loading />
        ) : (
          <ul>
            {comments.map((comment) => {
              return (
                <CommentCard
                  commentData={comment}
                  removeComment={this.removeComment}
                  key={comment.comment_id}
                  user={user}
                />
              );
            })}
          </ul>
        )}
      </section>
    );
  }
}

export default CommentsList;
