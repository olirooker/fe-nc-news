import React, { Component } from "react";
import { navigate, Router } from "@reach/router";
import ArticlesList from "./components/ArticlesList";
import TopicsList from "./components/TopicsList";
import UsersList from "./components/UsersList";
import SingleArticle from "./components/SingleArticle";
import ErrorMessage from "./components/ErrorMessage";
import SignIn from "./components/SignIn";
import styled from "styled-components";
import { getUser } from "./api";
import NewHeader from "./components/NewHeader";

const AppContainer = styled.div`
  margin: 0 auto;
  padding: 0;
`;
const StyledContainer = styled.div`
  margin: 0 auto;
  min-width: 400px;
  max-width: 800px;
  /* margin-top: 105px; */
`;
class App extends Component {
  state = {
    user: {},
  };

  authenticateUser = (username) => {
    getUser(username).then((user) => {
      // console.log(user)
      this.setState({ user: user });
    });
  };

  signOut = () => {
    this.setState({ user: {} });
    navigate("/");
  };

  // cDU to see if the state changes then re render

  render() {
    return (
      <AppContainer>
        <NewHeader user={this.state.user} signOut={this.signOut} />
        <StyledContainer>
          <Router>
            <ArticlesList path="/" />
            <SignIn path="/signin" authenticateUser={this.authenticateUser} />
            <ArticlesList path="/:topic/articles" />
            <ArticlesList path="/users/:username/articles" />
            <SingleArticle path="/articles/:article_id" />
            <TopicsList path="/topics" />
            <UsersList path="/users/:username" />
            <ErrorMessage default errorMessage="Page not found!" />
          </Router>
        </StyledContainer>
      </AppContainer>
    );
  }
}

export default App;
