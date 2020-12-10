import React, { Component } from 'react';
import styled from "styled-components";

const CommentAdderContainer = styled.div`
    margin: 1.5rem 0;
    padding: 5px 10px;
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 3px 6px 8px #888888;
`

class CommentAdder extends Component {
    state = {
        body: '',
    };

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        const { body } = this.state;
        const { addComment } = this.props;

        event.preventDefault();
        addComment({ body, username: 'jessjelly' });
        this.setState({ body: '' })
    }

    render() {
        return (
            <CommentAdderContainer>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Add a comment:
                    <textarea type="text" name="body" onChange={this.handleChange} value={this.state.body}></textarea>
                    </label>
                    <button type="submit">Post</button>
                </form>
            </CommentAdderContainer>
        );
    }
}

export default CommentAdder;