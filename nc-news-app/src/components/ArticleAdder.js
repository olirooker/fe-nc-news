import React, { Component } from 'react';
import { postArticle } from '../api';
import styled from 'styled-components';

const StyledArticleAdder = styled.section`
    margin: 1.5rem 0;
    padding: 5px 10px;
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 3px 6px 8px #888888;
    border-left: 5px solid yellowgreen;
`

class ArticleAdder extends Component {
    state = {
        body: '',
        username: 'jessjelly',
        title: '',
        topic: '',
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     postArticle()
    // };

    render() {
        return (
            <StyledArticleAdder>
                <h3>Post an article:</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Topic:
                        <input type="text" name="topic" id="topic" value={this.state.topic} placeholder="which topic?" onChange={this.handleChange} />
                    </label>
                    <label>
                        Title:
                        <input type="text" name="title" id="title" value={this.state.title} placeholder="title" onChange={this.handleChange} />
                    </label>
                    <label>
                        Body:
                        <textarea type="text" name="body" id="body" resize="none" value={this.state.body} placeholder="add your comment" onChange={this.handleChange}></textarea>
                    </label>
                    <button type="submit">Post</button>
                </form>
            </StyledArticleAdder>
        );
    }
}

export default ArticleAdder;