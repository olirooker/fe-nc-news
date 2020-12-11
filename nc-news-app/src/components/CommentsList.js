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
        const { article_id } = this.props;

        getArticleComments(article_id).then((comments) => {
            this.setState({ comments, isLoading: false })
        });
    };

    componentDidUpdate(prevProps, prevState) {
        const { article_id } = this.props;
        const { order, sort_by } = this.state;
        const newOrder = prevState.order !== this.state.order;
        const newSort = prevState.sort_by !== this.state.sort_by;

        console.log('hello')

        if (newOrder || newSort) {
            getArticleComments(article_id, order, sort_by).then((comments) => {
                this.setState({ comments });
            });
        }
    };

    addComment = (commentToAdd) => {
        const { article_id } = this.props;

        postComment(commentToAdd, article_id).then((newComment) => {
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
        // const { article_id } = this.props;

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