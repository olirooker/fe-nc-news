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

  @media screen and (max-width: 600px) {
    border-radius: 0rem;
  }
`;
const PostDetailsContainer = styled.div`
  display: flex;
  align-items: center;
`;
const UserAvatar = styled.img`
  margin-right: 8px;
  height: 50px;
  width: auto;
  /* padding: 25px; */
  /* background: #b5bdc4; */
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
  /* background: #3b49df; */
  /* background: #264653; */
  border-radius: 5px;
`;
const Reactions = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: flex-start;
`;
const Votes = styled.div``;
const Comments = styled.div`
  margin-left: 3rem;
  /* margin: 0 auto;
  padding: 0;
  display: flex;
  align-items: center; */
`;
const CommentIcon = styled.i`
  margin-right: 10px;
  color: #363d44;
`;
const CommentNumber = styled(Link)`
  text-decoration: none;
  color: #363d44;
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
      <Topic to={`/${article.topic}/articles`} className={article.topic}>
        #{article.topic}
      </Topic>
      {/* <Link to={`/articles/${article.article_id}`}>
          <p>{article.body}</p>
        </Link> */}

      <Reactions>
        <Votes>
          <Vote votes={article.votes} article_id={article.article_id} />
        </Votes>
        <Comments>
          <CommentIcon className='fa fa-comment'></CommentIcon>
          <CommentNumber to={`/articles/${article.article_id}`}>
            {article.comment_count}
          </CommentNumber>
        </Comments>
      </Reactions>
      {/* </div> */}
    </StyledCard>
  );
};

export default ArticleCard;
