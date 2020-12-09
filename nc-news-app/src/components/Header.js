import React, { Component } from 'react';
import { Link, navigate } from '@reach/router';
import { getTopics } from '../api';
import styled from 'styled-components';

const StyledHeader = styled.header`
margin: 0 auto;
padding: 35px 0;
width: 100vw;
min-width: inherit;
display: grid;
grid-template-rows: repeat(1fr);
grid-template-areas: 'logo dropdown signin';
align-items: center;
justify-items: center;
background-color: white;
box-shadow: 0 2px 0 rgba(0, 0, 0, 0.4);
`
const StyledLogo = styled.div`
    border: 1px solid black;
    margin: 0 auto;
    padding: 0;
    grid-area: logo;
`

const StyledNav = styled.div`
    border: 1px solid black;
    margin: 0 auto;
    padding: 0;
    grid-area: dropdown;
`

const StyledSignIn = styled.div`
    border: 1px solid black;
    margin: 0 auto;
    padding: 0;
    grid-area: signin;
`

class Header extends Component {
    state = {
        topics: [],
    };

    componentDidMount() {
        getTopics().then((topics) => {
            this.setState({ topics });
        });
    };

    // sign in and create account components go here?

    render() {
        const { userInfo } = this.props

        return (
            <StyledHeader>
                <StyledLogo>
                    <Link to="/"><h1>NC News</h1></Link>
                </StyledLogo>
                <StyledNav>
                    <label>
                        <select defaultValue="" onChange={(event) => { navigate(`/${event.target.value}/articles`) }}>
                            <option key="topic-placeholder" disabled={true} value="">Select a topic</option>
                            {this.state.topics.map(topic => {
                                return (
                                    <option key={topic.slug}>{topic.slug}</option>
                                )
                            })}
                        </select>
                    </label>
                </StyledNav>
                <StyledSignIn>
                    {userInfo.isLoggedIn ? <p>Hello, <Link to="/">{userInfo.user.username}</Link></p> : <Link to="/"><p>Sign-in</p></Link>}
                </StyledSignIn>
            </StyledHeader>
        );
    }
}

export default Header;