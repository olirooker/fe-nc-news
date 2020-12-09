import React, { Component } from 'react';
import { updateVote } from '../api';
import ErrorMessage from './ErrorMessage';

class Vote extends Component {
    state = {
        hasVotedUp: false,
        hasVotedDown: false,
        voteChange: 0,
        hasError: false,
        errorMessage: '',
    }

    handleClick = (num) => {
        const { article_id } = this.props;
        updateVote(article_id, num).then((article) => {
            if (num > 0) {
                this.setState({ voteChange: num, hasVotedUp: true })
            } else {
                this.setState({ voteChange: num, hasVotedDown: true })
            }
        })
    };

    render() {
        const { votes } = this.props;
        const { hasVotedUp, hasVotedDown, voteChange, hasError, errorMessage } = this.state;

        if (hasError) {
            return <ErrorMessage errorMessage={errorMessage} />
        } else {
            return (
                <div>
                    <button onClick={() => { this.handleClick(1) }} disabled={hasVotedUp}>up</button>
                    <p>{votes + voteChange}</p>
                    <button onClick={() => { this.handleClick(-1) }} disabled={hasVotedDown}>down</button>
                </div>
            );
        }
    }
}

export default Vote;