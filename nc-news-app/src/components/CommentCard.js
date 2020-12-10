import React from 'react';
import { Link } from '@reach/router';
import moment from 'moment';
import Vote from './Vote';

const CommentCard = ({ commentData }) => {
    return (

        <li>
            <div>
                <p>Posted by <Link to={`/users/${commentData.author}/articles`}>{commentData.author}</Link>, {moment(commentData.created_at).fromNow()}</p>
                <Vote votes={commentData.votes} article_id={commentData.article_id} />
            </div>

            <div>
                <p>{commentData.body}</p>
            </div>
        </li>

    )
};

export default CommentCard;