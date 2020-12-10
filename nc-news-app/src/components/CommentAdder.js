import React, { Component } from 'react';

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
            <form onSubmit={this.handleSubmit}>
                <label>
                    Add a comment:
                    <textarea type="text" name="body" onChange={this.handleChange} value={this.state.body}></textarea>
                </label>
                <button type="submit">Post</button>
            </form>
        );
    }
}

export default CommentAdder;