import React, { Component } from 'react';
import { getArticleComments, postComment } from '../api';
import CommentAdder from './CommentAdder';
import CommentCard from './CommentCard';
import Loading from './Loading';

class CommentsList extends Component {
    state = {
        comments: [],
        isLoading: true,
    }

    componentDidMount() {
        const { articleId } = this.props;

        getArticleComments(articleId).then((comments) => {
            this.setState({ comments, isLoading: false })
        });
    };

    addComment = (commentToAdd) => {
        const { articleId } = this.props;

        postComment(commentToAdd, articleId).then((newComment) => {
            this.setState(currState => {
                return {
                    comments: [newComment, ...currState.comments],
                };
            });
        });
    };

    render() {
        const { comments, isLoading } = this.state;
        // const { articleId } = this.props;

        return (
            <section>
                <h4>Comments List</h4>
                <section>
                    <CommentAdder addComment={this.addComment} />
                </section>
                <p>Comment list - queries here - sort_by and order</p>
                {isLoading ? (
                    <Loading />
                ) : (
                        <ul>
                            {comments.map(comment => {
                                return (
                                    <CommentCard commentData={comment} key={comment.comment_id} />
                                )
                            })}
                        </ul>
                    )}
            </section>
        );
    }
}

export default CommentsList;