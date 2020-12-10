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
        upVote: false,
        downVote: false,
        voteChange: 0,
        hasError: false,
        errorMessage: '',
    };

    handleClick = (value) => {
        const { article_id, comment_id } = this.props;



        updateArticleVote(article_id, value)
    };

    render() {
        const { votes } = this.props;
        const { hasVoted, voteChange, hasError, errorMessage } = this.state;

        if (hasError) {
            return <ErrorMessage errorMessage={errorMessage} />
        } else {
            return (
                <VotesContainer>
                    <button onClick={() => { this.handleClick(1) }} disabled={hasVoted}>up</button>
                    <p>{votes + voteChange}</p>
                    <button onClick={() => { this.handleClick(-1) }} disabled={hasVoted}>down</button>
                </VotesContainer>
            );
        }
    }
}

export default Vote;