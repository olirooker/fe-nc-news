import React, { Component } from 'react';
import {
  upVoteArticle,
  downVoteArticle,
  upVoteComment,
  downVoteComment,
} from '../api';
import ErrorMessage from './ErrorMessage';
import styled from 'styled-components';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

const VotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* align-items: center; */
  /* justify-items: center; */
  padding: 0;
  margin: 0;
`;

const VoteNumber = styled.p`
  color: #363d44;
  margin: 2rem 0;
  /* outline: solid green 1px; */
`;

const VoteUp = styled.button`
  display: block;
  border: none;
  cursor: pointer;
  background: none;
  /* outline: solid green 1px; */
  font-size: 2.4rem;
  padding: 0;
  margin: 0;
  display: flex;
  align-content: center;

  &:focus {
    outline: none;
  }
`;
const VoteDown = styled.button`
  border: none;
  cursor: pointer;
  background: none;
  /* outline: solid green 1px; */
  font-size: 2.4rem;
  padding: 0;
  margin: 0;
  display: flex;
  align-content: center;

  &:focus {
    outline: none;
  }
`;

class Vote extends Component {
  state = {
    hasError: false,
    errorMessage: '',
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
            {hasVotedUp ? (
              <FaHeart color='red' />
            ) : (
              <FaHeart color='lightgrey' />
            )}
          </VoteUp>
          <VoteNumber>{votes + voteChange}</VoteNumber>
          <VoteDown onClick={this.handleDownVoteClick} disabled={hasVotedUp}>
            {hasVotedDown ? (
              <FaHeartBroken color='darkred' />
            ) : (
              <FaHeartBroken color='lightgrey' />
            )}
          </VoteDown>
        </VotesContainer>
      );
    }
  }
}

export default Vote;
