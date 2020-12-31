import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import { getTopics } from "../api";
import styled from "styled-components";

const Nav = styled.nav`
  background: #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.6);
  height: 80px;
  display: flex;
  align-content: center;
  padding: 0.5rem 3rem;
  z-index: 1;
`;
const NavContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
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
  position: relative;
  display: inline-block;
  align-items: center;
  background: none;
  border: none;
  font-size: 1.6rem;
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
const DropDownList = styled.ul`
  position: absolute;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  font-size: 1.3rem;
  font-weight: 500;
`;
const DropDownItem = styled.button`
  display: block;
  padding: 2.6rem;
  background: none;
  border: none;
  border-top: 1px solid #e5e5e5;
  width: 100%;
  font-size: 1.6rem;

  &:first-child {
    border-top: none;
  }

  &:hover {
    background: orangered;
  }
  &:focus {
    outline: none;
  }

  @media screen and (max-width: 500px) {
    padding: 4rem 0;
    font-size: 2.2rem;
  }
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

  toggleMenu = (event) => {
    // event.preventDefault();
    this.setState((currentState) => {
      return { isOpen: !currentState.isOpen };
    }, console.log("toggle"));
  };

  //   openMenu = (event) => {
  //     event.preventDefault();
  //     console.log("open menu");

  //     this.setState({ isOpen: true }, () => {
  //       document.addEventListener("click", () => {
  //         this.closeMenu();
  //       });
  //     });
  //   };

  //   closeMenu = (event) => {
  //     console.log("close menu");
  //     console.log(event.target, "event target");
  //     if (!this.dropDown.current.contains(event.target)) {
  //       this.setState({ isOpen: false }, () => {
  //         document.removeEventListener("click", this.closeMenu);
  //       });
  //     }
  //   };

  render() {
    const { username, avatar_url } = this.props.user;
    const { signOut } = this.props;
    const { isOpen } = this.state;
    return (
      <div>
        <Nav>
          <NavContainer>
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
                      <option
                        key={topic.slug}
                        value={`/${topic.slug}/articles`}
                      >
                        {topic.slug}
                      </option>
                    );
                  })}
                </select>
              </label>
            </TopicsDropDown>
          </NavContainer>
          {username ? (
            <NavUserSignedIn onClick={this.toggleMenu}>
              <UserMenu>
                <UserAvatar src={avatar_url} alt="Your profile avatar" />
                <UserWelcome>Hello, {username}</UserWelcome>
                {isOpen ? (
                  <i className="fa fa-chevron-up"></i>
                ) : (
                  <i className="fa fa-chevron-down"></i>
                )}
              </UserMenu>
              {/* {isOpen ? (
                <div>
                  <DropDownList>
                    <DropDownItem>My Articles</DropDownItem>
                    <DropDownItem>Sign Out</DropDownItem>
                  </DropDownList>
                </div>
              ) : null} */}
            </NavUserSignedIn>
          ) : (
            <NavUserSignedOut>
              <SignInBtn to="/signin">Sign In</SignInBtn>
              <CreateAccountBtn to="/signin">Create Account</CreateAccountBtn>
            </NavUserSignedOut>
          )}
        </Nav>
        {isOpen ? (
          <div>
            <DropDownList>
              <DropDownItem
                onClick={() => {
                  navigate("/");
                  this.toggleMenu();
                }}
              >
                <i className="fa fa-home"></i> Home
              </DropDownItem>
              <DropDownItem
                onClick={() => {
                  navigate(`/users/${username}/articles`);
                  this.toggleMenu();
                }}
              >
                <i className="fa fa-newspaper-o"></i> My Articles
              </DropDownItem>
              <DropDownItem
                onClick={() => {
                  signOut();
                  this.toggleMenu();
                }}
              >
                <i className="fa fa-sign-out"></i> Sign Out
              </DropDownItem>
            </DropDownList>
          </div>
        ) : null}
      </div>
    );
  }
}

export default NewHeader;
