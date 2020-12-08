import React, { Component } from 'react';
import { getArticleComments } from '../api';
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

    render() {
        const { comments, isLoading } = this.state;
        const { articleId } = this.props;

        return (
            <section>
                <h4>Comments List</h4>
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