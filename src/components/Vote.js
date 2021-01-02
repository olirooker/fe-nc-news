import React, { Component } from "react";
import {
  upVoteArticle,
  downVoteArticle,
  upVoteComment,
  downVoteComment,
} from "../api";
import ErrorMessage from "./ErrorMessage";
import styled from "styled-components";

const VotesContainer = styled.div`
  display: flex;
  align-items: center;
  /* display: grid;
    grid-template-rows: repeat(1fr);
    grid-template-areas: 'upvote num downvote'; */
  /* justify-items: center; */
`;

const VoteNumber = styled.p`
  color: #363d44;
`;

const VoteUp = styled.button`
  &:active {
  }
`;
const VoteDown = styled.button`
  &:active {
  }
`;

class Vote extends Component {
  state = {
    hasError: false,
    errorMessage: "",
    hasVotedUp: false,
    hasVotedDown: false,
    hasVoted: false,
    voteChange: 0,
  };

  handleUpVoteClick = () => {
    const { article_id, comment_id } = this.props;
    const { hasVotedUp } = this.state;

    if (article_id) {
      if (!hasVotedUp) {
        upVoteArticle(article_id).catch((err) => {
          const {
            response: { status, statusText },
          } = err;
          this.setState({
            hasError: true,
            errorMessage: `Unable to vote ... ${status}. ${statusText}`,
            hasVotedUp: false,
            hasVotedDown: false,
            voteChange: 0,
          });
        });
        this.setState((currentState) => {
          return {
            voteChange: currentState.voteChange + 1,
            hasVotedUp: !currentState.hasVotedUp,
          };
        });
      } else {
        downVoteArticle(article_id).catch((err) => {
          const {
            response: { status, statusText },
          } = err;
          this.setState({
            hasError: true,
            errorMessage: `Unable to vote ... ${status}. ${statusText}`,
            hasVotedUp: false,
            hasVotedDown: false,
            voteChange: 0,
          });
        });
        this.setState((currentState) => {
          return {
            voteChange: currentState.voteChange - 1,
            hasVotedUp: !currentState.hasVotedUp,
          };
        });
      }
    }

    if (comment_id) {
      if (!hasVotedUp) {
        upVoteComment(comment_id).catch((err) => {
          const {
            response: { status, statusText },
          } = err;
          this.setState({
            hasError: true,
            errorMessage: `Unable to vote ... ${status}. ${statusText}`,
            hasVotedUp: false,
            hasVotedDown: false,
            voteChange: 0,
          });
        });
        this.setState((currentState) => {
          return {
            voteChange: currentState.voteChange + 1,
            hasVotedUp: !currentState.hasVotedUp,
          };
        });
      } else {
        downVoteComment(comment_id).catch((err) => {
          const {
            response: { status, statusText },
          } = err;
          this.setState({
            hasError: true,
            errorMessage: `Unable to vote ... ${status}. ${statusText}`,
            hasVotedUp: false,
            hasVotedDown: false,
            voteChange: 0,
          });
        });
        this.setState((currentState) => {
          return {
            voteChange: currentState.voteChange - 1,
            hasVotedUp: !currentState.hasVotedUp,
          };
        });
      }
    }
  };

  handleDownVoteClick = () => {
    const { article_id, comment_id } = this.props;
    const { hasVotedDown } = this.state;

    if (article_id) {
      if (!hasVotedDown) {
        downVoteArticle(article_id).catch((err) => {
          const {
            response: { status, statusText },
          } = err;
          this.setState({
            hasError: true,
            errorMessage: `Unable to vote ... ${status}. ${statusText}`,
            hasVotedUp: false,
            hasVotedDown: false,
            voteChange: 0,
          });
        });
        this.setState((currentState) => {
          return {
            voteChange: currentState.voteChange - 1,
            hasVotedDown: !currentState.hasVotedDown,
          };
        });
      } else {
        upVoteArticle(article_id).catch((err) => {
          const {
            response: { status, statusText },
          } = err;
          this.setState({
            hasError: true,
            errorMessage: `Unable to vote ... ${status}. ${statusText}`,
            hasVotedUp: false,
            hasVotedDown: false,
            voteChange: 0,
          });
        });
        this.setState((currentState) => {
          return {
            voteChange: currentState.voteChange + 1,
            hasVotedDown: !currentState.hasVotedDown,
          };
        });
      }
    }

    if (comment_id) {
      if (!hasVotedDown) {
        downVoteComment(comment_id).catch((err) => {
          const {
            response: { status, statusText },
          } = err;
          this.setState({
            hasError: true,
            errorMessage: `Unable to vote ... ${status}. ${statusText}`,
            hasVotedUp: false,
            hasVotedDown: false,
            voteChange: 0,
          });
        });
        this.setState((currentState) => {
          return {
            voteChange: currentState.voteChange - 1,
            hasVotedDown: !currentState.hasVotedDown,
          };
        });
      } else {
        upVoteComment(comment_id).catch((err) => {
          const {
            response: { status, statusText },
          } = err;
          this.setState({
            hasError: true,
            errorMessage: `Unable to vote ... ${status}. ${statusText}`,
            hasVotedUp: false,
            hasVotedDown: false,
            voteChange: 0,
          });
        });
        this.setState((currentState) => {
          return {
            voteChange: currentState.voteChange + 1,
            hasVotedDown: !currentState.hasVotedDown,
          };
        });
      }
    }
  };

  // this.setState((currentState) => {
  //     return { hasVotedUp: !currentState.hasVotedUp }
  // }, () => {
  //     if (this.state.hasVotedUp === true) {
  //         upVoteArticle(article_id)
  //     } else {
  //         downVoteArticle(article_id)
  //     }
  // })

  // updateArticleVote(article_id, value)
  //     .catch((err) => {
  //         const { response: { status, statusText } } = err;
  //         this.setState({
  //             hasError: true,
  //             errorMessage: `Unable to vote ... ${status}. ${statusText}`,
  //             hasVotedUp: false,
  //             hasVotedDown: false,
  //             voteChange: 0,
  //         })
  //     })

  // if (value > 0) {
  //     this.setState((currentState) => {
  //         return { voteChange: currentState.voteChange + value, hasVotedUp: true }
  //     })
  // } else {
  //     this.setState((currentState) => {
  //         return { voteChange: currentState.voteChange + value, hasVotedDown: true }
  //     })
  // }
  // };

  render() {
    const { votes } = this.props;
    const {
      hasError,
      errorMessage,
      hasVotedUp,
      hasVotedDown,
      voteChange,
    } = this.state;

    if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return (
        <VotesContainer>
          <VoteUp onClick={this.handleUpVoteClick} disabled={hasVotedDown}>
            up
          </VoteUp>
          <VoteNumber>{votes + voteChange}</VoteNumber>
          <VoteDown onClick={this.handleDownVoteClick} disabled={hasVotedUp}>
            down
          </VoteDown>
        </VotesContainer>
      );
    }
  }
}

export default Vote;
