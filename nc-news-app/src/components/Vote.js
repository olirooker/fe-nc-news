import React, { Component } from 'react';
import { upVoteArticle, downVoteArticle } from '../api';
import ErrorMessage from './ErrorMessage';
import styled from 'styled-components';

const VotesContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(1fr);
    grid-template-areas: 'upvote num downvote';
    align-items: center;
    justify-items: center;
`

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

        if (!hasVotedUp) {
            upVoteArticle(article_id).catch((err) => {
                const { response: { status, statusText } } = err;
                this.setState({
                    hasError: true, errorMessage: `Unable to vote ... ${status}. ${statusText}`, hasVotedUp: false, hasVotedDown: false, voteChange: 0,
                })
            })
            this.setState((currentState) => {
                return { voteChange: currentState.voteChange + 1, hasVotedUp: !currentState.hasVotedUp }
            })
        } else {
            downVoteArticle(article_id).catch((err) => {
                const { response: { status, statusText } } = err;
                this.setState({
                    hasError: true, errorMessage: `Unable to vote ... ${status}. ${statusText}`, hasVotedUp: false, hasVotedDown: false, voteChange: 0,
                })
            })
            this.setState((currentState) => {
                return { voteChange: currentState.voteChange - 1, hasVotedUp: !currentState.hasVotedUp }
            })
        }
    };

    handleDownVoteClick = () => {
        const { article_id, comment_id } = this.props;
        const { hasVotedDown } = this.state;

        if (!hasVotedDown) {
            downVoteArticle(article_id).catch((err) => {
                const { response: { status, statusText } } = err;
                this.setState({
                    hasError: true, errorMessage: `Unable to vote ... ${status}. ${statusText}`, hasVotedUp: false, hasVotedDown: false, voteChange: 0,
                })
            })
            this.setState((currentState) => {
                return { voteChange: currentState.voteChange - 1, hasVotedDown: !currentState.hasVotedDown }
            })
        } else {
            upVoteArticle(article_id).catch((err) => {
                const { response: { status, statusText } } = err;
                this.setState({
                    hasError: true, errorMessage: `Unable to vote ... ${status}. ${statusText}`, hasVotedUp: false, hasVotedDown: false, voteChange: 0,
                })
            })
            this.setState((currentState) => {
                return { voteChange: currentState.voteChange + 1, hasVotedDown: !currentState.hasVotedDown }
            })
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
        const { hasError, errorMessage, hasVotedUp, hasVotedDown, voteChange } = this.state;

        if (hasError) {
            return <ErrorMessage errorMessage={errorMessage} />
        } else {
            return (
                <VotesContainer>
                    <button onClick={this.handleUpVoteClick} disabled={hasVotedDown}>up</button>
                    <p>{votes + voteChange}</p>
                    <button onClick={this.handleDownVoteClick} disabled={hasVotedUp}>down</button>
                </VotesContainer>
            );
        }
    }
}

export default Vote;