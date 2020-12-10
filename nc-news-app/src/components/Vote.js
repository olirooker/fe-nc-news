import React, { Component } from 'react';
import { updateArticleVote, updateCommentVote } from '../api';
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
        voteChange: 0,
    };

    handleClick = (value) => {
        const { article_id, comment_id } = this.props;
        console.log(article_id, 'article id');
        console.log(article_id, 'comment id');
        console.log(value, 'value')

        updateArticleVote(article_id, value)
            .catch((err) => {
                const { response: { status, statusText } } = err;
                this.setState({
                    hasError: true,
                    errorMessage: `Unable to vote ... ${status}. ${statusText}`,
                    hasVotedUp: false,
                    hasVotedDown: false,
                    voteChange: 0,
                })
            })

        if (value > 0) {
            this.setState((currentState) => {
                return { voteChange: currentState.voteChange + value, hasVotedUp: true }
            })
        } else {
            this.setState((currentState) => {
                return { voteChange: currentState.voteChange + value, hasVotedDown: true }
            })
        }
    };

    render() {
        const { votes } = this.props;
        const { hasError, errorMessage, hasVotedUp, hasVotedDown, voteChange } = this.state;

        if (hasError) {
            return <ErrorMessage errorMessage={errorMessage} />
        } else {
            return (
                <VotesContainer>
                    <button onClick={() => { this.handleClick(1) }} disabled={hasVotedUp}>up</button>
                    <p>{votes + voteChange}</p>
                    <button onClick={() => { this.handleClick(-1) }} disabled={hasVotedDown}>down</button>
                </VotesContainer>
            );
        }
    }
}

export default Vote;