import { navigate } from '@reach/router';
import React, { Component } from 'react';
import styled from 'styled-components';

const SignInContainer = styled.section`
    margin: 1.5rem 0;
    padding: 5px 10px;
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 3px 6px 8px #888888;
    text-align: center;
`

class SignIn extends Component {
    state = {
        username: '',
    };

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        const { username } = this.state;
        const { authenticateUser } = this.props;

        event.preventDefault();
        authenticateUser(username);
        this.setState({ username: '' })
        navigate('/')
    }

    render() {
        return (
            <SignInContainer>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Sign in to your account:
                        <br />
                        <input type="text" name="username" onChange={this.handleChange} value={this.state.username} />
                        <br />
                        <button type="submit" onClick={this.handleChange}>Sign In</button>
                    </label>
                </form>
            </SignInContainer>
        );
    }
}

export default SignIn;