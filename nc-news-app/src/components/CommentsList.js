import React, { Component } from 'react';
import { getArticleComments, postComment } from '../api';
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
    }

    componentDidMount() {
        const { articleId } = this.props;

        getArticleComments(articleId).then((comments) => {
            this.setState({ comments, isLoading: false })
        });
    };

    componentDidUpdate(currentState) {
        const { articleId } = this.props;
        const { order, sort_by } = this.state;
        const newOrder = currentState.order !== this.state.order;
        const newSort = currentState.sort_by !== this.state.sort_by;

        if (newOrder || newSort) {
            getArticleComments(articleId, order, sort_by).then((comments) => {
                this.setState({ comments });
            });
        }
    };

    addComment = (commentToAdd) => {
        const { articleId } = this.props;

        postComment(commentToAdd, articleId).then((newComment) => {
            this.setState(currentState => {
                return {
                    comments: [newComment, ...currentState.comments],
                };
            });
        });
    };

    changeOrder = (newOrder) => {
        this.setState({ order: newOrder });
    };

    changeSort = (newSort) => {
        this.setState({ sort_by: newSort });
    };

    removeComment = (comment_id) => {

    };

    render() {
        const { comments, isLoading } = this.state;
        // const { articleId } = this.props;

        return (
            <section>
                <section>
                    <CommentAdder addComment={this.addComment} />
                </section>
                <Query changeOrder={this.changeOrder} changeSort={this.changeSort} />
                {isLoading ? (
                    <Loading />
                ) : (
                        <ul>
                            {comments.map(comment => {
                                return (
                                    <CommentCard commentData={comment} removeComment={this.removeComment} key={comment.comment_id} />
                                )
                            })}
                        </ul>
                    )}
            </section>
        );
    }
}

export default CommentsList;