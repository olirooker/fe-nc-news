import React from 'react';
import { Link } from '@reach/router';
import moment from 'moment';
import styled from 'styled-components';

const StyledCard = styled.div`
    margin: 1.5rem 0;
    padding: 5px 10px;
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
    border-left: 5px solid red;
`

const Title = styled.h2`

    font-size: 2.6rem;
    font-weight: 600;
    color: #333;
`


const ArticleCard = ({ articleData }) => {
    // console.log(moment(articleData.created_at).fromNow())
    // console.log(articleData.body)
    return (
        <StyledCard>
            <div>
                <p><Link to={`/${articleData.topic}/articles`}>{articleData.topic}</Link>. Posted by <Link to={`/users/${articleData.author}/articles`}>{articleData.author}</Link>, {moment(articleData.created_at).fromNow()}</p>
            </div>

            <div>
                <Link to={`/articles/${articleData.article_id}`} style={{ textDecoration: 'none' }}><Title>{articleData.title}</Title></Link>
                <Link to={`/articles/${articleData.article_id}`}><p>{articleData.body}</p></Link>
            </div>

            <div>
                <p>{articleData.votes}</p>
                <Link to={`/articles/${articleData.article_id}/comments`}><p>{articleData.comment_count}</p></Link>
            </div>
        </StyledCard >
    )
};

export default ArticleCard;