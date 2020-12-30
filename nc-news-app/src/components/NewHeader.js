import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import { getTopics } from "../api";
import styled from "styled-components";

const Nav = styled.nav`
  background: #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.6);
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 1;
`;
const NavLink = styled(Link)`
  color: #333;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;
const TopicsDropDown = styled.div`
  display: flex;
  align-items: center;
  /* margin-right: -24px; */

  @media screen and (max-width: 500px) {
    display: none;
  }
`;
const NavUserSignedOut = styled.div`
  display: flex;
  align-items: center;
`;
const SignInBtn = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  margin-right: 3px;
  padding: 10px 22px;
  color: #fff;
  font-size: 1.4rem;
  border: 1px solid #256ce1;
  outline: none;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 300ms ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
const CreateAccountBtn = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  margin-left: 3px;
  padding: 10px 22px;
  color: #fff;
  font-size: 1.4rem;
  border: 1px solid #256ce1;
  outline: none;
  transition: all 300ms ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 300ms ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
const NavUserSignedIn = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;
const UserMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.img`
  height: 4rem;
  width: auto;
  border-radius: 50%;
`;
const UserWelcome = styled.p`
  margin: 10px;
`;
const DropDownContainer = styled.div`
  /* left: -100px;
  top: -100px; */
`;
const DropDownList = styled.ul`
  padding: 1rem;
  margin: 0;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8rem;
  }
`;
const ListItem = styled.li`
  list-style: none;
  padding: 0.8rem 0;
`;

class NewHeader extends Component {
  state = {
    topics: [],
    isOpen: false,
  };

  componentDidMount() {
    getTopics().then((topics) => {
      this.setState({ topics });
    });
  }

  handleUserMenu = (event) => {
    this.setState((currentState) => {
      return { isOpen: !currentState.isOpen };
    });
  };

  render() {
    const { username, avatar_url } = this.props.user;
    const { isOpen } = this.state;
    return (
      <div>
        <Nav>
          <NavLink to="/">NC News</NavLink>
          <TopicsDropDown>
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
          </TopicsDropDown>
          {username ? (
            <NavUserSignedIn type="button" onClick={this.handleUserMenu}>
              <UserMenu>
                <UserAvatar src={avatar_url} alt="Your profile avatar" />
                <UserWelcome>Hello, {username}</UserWelcome>
                {isOpen ? (
                  <i className="fa fa-chevron-up"></i>
                ) : (
                  <i className="fa fa-chevron-down"></i>
                )}
              </UserMenu>

              {isOpen && (
                <DropDownContainer>
                  <DropDownList>
                    <ListItem>My Articles</ListItem>
                    <ListItem>Sign Out</ListItem>
                  </DropDownList>
                </DropDownContainer>
              )}
            </NavUserSignedIn>
          ) : (
            <NavUserSignedOut>
              <SignInBtn to="/signin">Sign In</SignInBtn>
              <CreateAccountBtn to="/signin">Create Account</CreateAccountBtn>
            </NavUserSignedOut>
          )}
        </Nav>
      </div>
    );
  }
}

export default NewHeader;
