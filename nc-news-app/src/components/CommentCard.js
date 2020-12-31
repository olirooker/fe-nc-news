import React, { Component } from "react";
import { Link } from "@reach/router";
import moment from "moment";
import Vote from "./Vote";
import styled from "styled-components";
import { deleteComment } from "../api";
import ErrorMessage from "./ErrorMessage";

const CommentContainer = styled.div`
  margin: 1.5rem 0;
  padding: 5px 10px;
  background-color: white;
  border: 1px solid lightgrey;
  box-shadow: 3px 6px 8px #888888;
  border-left: 5px solid blue;
`;

class CommentCard extends Component {
  state = {
    username: "jessjelly",
    hasError: false,
    errorMessage: "",
  };

  handleClick = (event) => {
    const { comment_id } = this.props.commentData;
    const { removeComment } = this.props;

    console.log(comment_id);
    deleteComment(comment_id)
      .then((comment) => {
        removeComment(comment_id);
      })
      .catch((err) => {
        const {
          response: { status, statusText },
        } = err;
        console.dir(err);
        this.setState({
          hasError: true,
          errorMessage: `Unable to delete comment ... ${status}. ${statusText}`,
        });
      });
  };

  render() {
    const { commentData } = this.props;
    const { username, hasError, errorMessage } = this.state;

    if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return (
        <CommentContainer>
          <div>
            <p>
              Posted by{" "}
              <Link to={`/users/${commentData.author}/articles`}>
                {commentData.author}
              </Link>
              , {moment(commentData.created_at).fromNow()}
            </p>
            <Vote
              votes={commentData.votes}
              comment_id={commentData.comment_id}
            />
          </div>

          <div>
            <p>{commentData.body}</p>
          </div>
          <div>
            {commentData.author === username ? (
              <button onClick={this.handleClick}>Delete comment</button>
            ) : (
              <p hidden>cannot delete</p>
            )}
          </div>
        </CommentContainer>
      );
    }
  }
}

export default CommentCard;
