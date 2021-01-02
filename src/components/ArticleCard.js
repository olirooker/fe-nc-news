import React from "react";
import { Link } from "@reach/router";
import moment from "moment";
import styled from "styled-components";
import Vote from "./Vote";

const StyledCard = styled.div`
  margin: 1.5rem 0;
  padding: 5px 10px;
  background-color: white;
  border: 1px solid #b5bdc4;
  border-radius: 1rem;
  box-shadow: 3px 6px 8px #888888;
`;
const PostDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
`;
const UserAvatar = styled.div`
  margin-right: 8px;
  padding: 25px;
  background: grey;
  border-radius: 50%;
`;
const PostDetails = styled.p`
  padding: 8px 0;
`;
const Author = styled(Link)`
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  cursor: pointer;
`;
const Time = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  color: grey;
`;
const Title = styled(Link)`
  display: flex;
  font-size: 2.6rem;
  font-weight: 600;
  text-decoration: none;
  color: #262626;
  padding-bottom: 10px;
`;
const Topic = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 5px;
  background: purple;
  border-radius: 5px;
`;
const Reactions = styled.div`
  display: flex;
  align-items: flex-start;
`;
const Votes = styled.div`
  margin: 0 auto;
  padding: 0;
  display: flex;
  align-items: center;
`;
const Comments = styled.div`
  margin: 0 auto;
  padding: 0;
  display: flex;
  align-items: center;
  /* grid-area: comments; */
  /* flex-direction: row; */
`;
const CommentIcon = styled.i`
  margin-left: 10px;
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
        <UserAvatar></UserAvatar>
        <PostDetails>
          <Author to={`/users/${article.author}/articles`}>
            {article.author}
          </Author>
          <Time>{moment(article.created_at).fromNow()}</Time>
        </PostDetails>
      </PostDetailsContainer>
      <Title to={`/articles/${article.article_id}`}>{article.title}</Title>
      <Topic to={`/${article.topic}/articles`}>#{article.topic}</Topic>
      {/* <Link to={`/articles/${article.article_id}`}>
          <p>{article.body}</p>
        </Link> */}

      <Reactions>
        <Votes>
          <Vote votes={article.votes} article_id={article.article_id} />
        </Votes>
        <Comments>
          <Link to={`/articles/${article.article_id}`}>
            {article.comment_count}
          </Link>
          <CommentIcon className="fa fa-comment"></CommentIcon>
        </Comments>
      </Reactions>
      {/* </div> */}
    </StyledCard>
  );
};

export default ArticleCard;
