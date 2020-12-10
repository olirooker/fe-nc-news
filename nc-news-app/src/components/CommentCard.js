import React from 'react';
import { Link } from '@reach/router';
import moment from 'moment';
import Vote from './Vote';
import styled from "styled-components";

const CommentContainer = styled.div`
    margin: 1.5rem 0;
    padding: 5px 10px;
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 3px 6px 8px #888888;
    border-left: 5px solid blue;
`

const CommentCard = ({ commentData }) => {
    return (

        <CommentContainer>
            <div>
                <p>Posted by <Link to={`/users/${commentData.author}/articles`}>{commentData.author}</Link>, {moment(commentData.created_at).fromNow()}</p>
                <Vote votes={commentData.votes} comment_id={commentData.comment_id} />
            </div>

            <div>
                <p>{commentData.body}</p>
            </div>
        </CommentContainer>

    )
};

export default CommentCard;