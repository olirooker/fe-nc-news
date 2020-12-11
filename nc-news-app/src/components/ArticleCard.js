import React from 'react';
import { Link } from '@reach/router';
import moment from 'moment';
import styled from 'styled-components';
import Vote from './Vote';

const StyledCard = styled.div`
    margin: 1.5rem 0;
    padding: 5px 10px;
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 3px 6px 8px #888888;
    border-left: 5px solid red;
`
const Title = styled.h2`
    font-size: 2.6rem;
    font-weight: 600;
    color: #262626;
`
const Text = styled.p`
    font-size: 1.4rem;
    font-weight: 400;
    color: grey;
    padding: 8px 0;
`
const StyledInteractions = styled.div`
    display: grid;
    grid-template-rows: repeat(1fr);
    grid-template-areas: 'votes comments';
    align-items: center;
    justify-items: center;
    padding: 5px 0;
    font-size: 2rem;
`
const StyledVotes = styled.div`
    margin: 0 auto;
    padding: 0;
    grid-area: votes;
`
const StyledComments = styled.div`
    margin: 0 auto;
    padding: 0;
    grid-area: comments;
`

const ArticleCard = ({ article }) => {
    return (
        <StyledCard>
            <div>
                <Text><Link to={`/${article.topic}/articles`}>{article.topic}</Link>. Posted by <Link to={`/users/${article.author}/articles`}>{article.author}</Link>, {moment(article.created_at).fromNow()}</Text>
            </div>

            <div>
                <Link to={`/articles/${article.article_id}`} style={{ textDecoration: 'none' }}><Title>{article.title}</Title></Link>
                <Link to={`/articles/${article.article_id}`}><p>{article.body}</p></Link>
            </div>

            <StyledInteractions>
                <StyledVotes>
                    <Vote votes={article.votes} article_id={article.article_id} />
                </StyledVotes>
                <StyledComments>
                    <Link to={`/articles/${article.article_id}/comments`}><p>{article.comment_count}</p></Link>
                </StyledComments>
            </StyledInteractions>
        </StyledCard >
    )
};

export default ArticleCard;