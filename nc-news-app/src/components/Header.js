import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import { getTopics } from "../api";
import styled from "styled-components";

const StyledHeader = styled.header`
  margin: 0 auto;
  padding: 25px 0;
  width: 100vw;
  min-width: inherit;
  display: grid;
  grid-template-rows: repeat(1fr);
  grid-template-areas: "logo dropdown signin";
  align-items: center;
  justify-items: center;
  background-color: white;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
`;
const StyledLogo = styled.div`
  margin: 0 auto;
  padding: 0;
  grid-area: logo;
  font-size: 3rem;
`;
const StyledNav = styled.div`
  margin: 0 auto;
  padding: 0;
  grid-area: dropdown;
`;
const StyledSignIn = styled.div`
  margin: 0 auto;
  padding: 0;
  grid-area: signin;
`;
const StyledButton = styled.button`
  background: none;
  border: none;
  justify-self: center;
`;
const StyledUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const StyledAvatar = styled.img`
  height: 4rem;
  width: auto;
  border-radius: 50%;
  margin-right: 10px;
`;

// background #242526;
// background accent #484a4d;
// text color #dadce1;
// border 1px solid #474a4d;

class Header extends Component {
  state = {
    topics: [],
    isOpen: false,
  };

  componentDidMount() {
    getTopics().then((topics) => {
      this.setState({ topics });
    });
  }

  render() {
    const { username, name, avatar_url } = this.props.userInfo;
    const { signOut } = this.props;

    return (
      <StyledHeader>
        <StyledLogo>
          <Link to="/">
            <h1>NC News</h1>
          </Link>
        </StyledLogo>
        <StyledNav>
          <label>
            <select
              defaultValue=""
              onChange={(event) => {
                navigate(event.target.value);
              }}
            >
              <option key="topic-placeholder" disabled={true} value="">
                Select a topic
              </option>
              <option key="all-topics" value="/">
                all topics
              </option>
              {this.state.topics.map((topic) => {
                return (
                  <option key={topic.slug} value={`/${topic.slug}/articles`}>
                    {topic.slug}
                  </option>
                );
              })}
            </select>
          </label>
        </StyledNav>
        <StyledSignIn>
          {username ? (
            <StyledButton>
              <StyledUserContainer>
                <StyledAvatar src={avatar_url} alt="Your profile avatar" />
                <p>
                  Hello,{" "}
                  <Link to={`/users/${username}/articles`}>{username}</Link>
                </p>
                {/* <button onClick={signOut}>Sign Out</button> */}
              </StyledUserContainer>
            </StyledButton>
          ) : (
            <div>
              <button
                onClick={(event) => {
                  navigate("/signin");
                }}
              >
                Sign In
              </button>
              <button>Create Account</button>
              {/* <Link to="/signin"><p>Sign-in</p></Link> */}
            </div>
          )}
        </StyledSignIn>
      </StyledHeader>
    );
  }
}

export default Header;
