import React from 'react';
import { Link } from '@reach/router';
import moment from 'moment';
import styled from 'styled-components';
import Vote from './Vote';
import userAvatar from '../assets/nc-avatar-01.svg';

const StyledCard = styled.div`
  margin: 1.8rem 0;
  padding: 2rem;
  padding-top: 1.4rem;
  background-color: white;
  border: 1px solid #b5bdc4;
  border-radius: 1rem;
  box-shadow: 1.5px 3px 4px #888888;
  display: grid;
  grid-template-columns: auto 40px;
  grid-template-areas: 'content reactions';

  @media screen and (max-width: 600px) {
    border-radius: 0rem;
  }
`;
const ArticleDetailsContainer = styled.div`
  grid-area: content;
`;
const PostDetailsContainer = styled.div`
  display: flex;
  align-items: center;
`;
const UserAvatar = styled.img`
  margin-right: 8px;
  height: 50px;
  width: auto;
  border-radius: 50%;
`;
const PostDetails = styled.div`
  padding: 8px 0;
`;
const Author = styled(Link)`
  font-size: 1.8rem;
  font-weight: 600;
  color: #202428;
  text-decoration: none;
  cursor: pointer;
`;
const Time = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  color: grey;
`;
const Title = styled(Link)`
  display: flex;
  font-size: 2.6rem;
  font-weight: 600;
  text-decoration: none;
  color: #202428;
  margin-bottom: 1rem;
`;
const Topic = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 5px;
  border-radius: 5px;
`;
const Reactions = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0 auto;
  grid-area: reactions;
`;
const Votes = styled.div``;

const Comments = styled(Link)`
  text-decoration: none;
  color: #363d44;
  border: 1px solid #f5f5f5;
  color: black;
  padding: 5px;
  border-radius: 5px;
  margin-left: 1rem;
  background: #f5f5f5;

  &:hover {
    /* background: lightgrey; */
    border: 1px solid lightgrey;
  }
`;
const TagsContainer = styled.div`
  display: inline;
`;
// const UserIcon = styled.div`
//   margin: 0;
//   padding: 40px;
//   background: lightgray;
//   border-radius: 50%;
// `;

const ArticleCard = ({ article }) => {
  return (
    <StyledCard>
      {/* <UserIcon></UserIcon>*/}
      {/* <div> */}

      {/* <Text>
        Posted by{" "}
        <Link to={`/users/${article.author}/articles`}>{article.author}</Link>,{" "}
        {moment(article.created_at).fromNow()}
      </Text> */}
      <ArticleDetailsContainer>
        <PostDetailsContainer>
          <UserAvatar src={userAvatar}></UserAvatar>
          <PostDetails>
            <Author to={`/users/${article.author}/articles`}>
              {article.author}
            </Author>
            <Time>{moment(article.created_at).fromNow()}</Time>
          </PostDetails>
        </PostDetailsContainer>
        <Title to={`/articles/${article.article_id}`}>{article.title}</Title>
        <TagsContainer>
          <Topic to={`/${article.topic}/articles`} className={article.topic}>
            #{article.topic}
          </Topic>
          <Comments to={`/articles/${article.article_id}`}>
            {article.comment_count} Comments
          </Comments>
        </TagsContainer>
      </ArticleDetailsContainer>
      {/* <Link to={`/articles/${article.article_id}`}>
          <p>{article.body}</p>
        </Link> */}

      <Reactions>
        <Votes>
          <Vote votes={article.votes} article_id={article.article_id} />
        </Votes>
        {/* <Comments>
          <CommentIcon className='fa fa-comment'></CommentIcon>
          <CommentNumber to={`/articles/${article.article_id}`}>
            {article.comment_count}
          </CommentNumber>
        </Comments> */}
      </Reactions>
      {/* </div> */}
    </StyledCard>
  );
};

export default ArticleCard;
