import React, { Component } from 'react';
import { Router } from "@reach/router";
import Header from './components/Header';
import ArticlesList from './components/ArticlesList';
import TopicsList from './components/TopicsList';
import UsersList from './components/UsersList';
import SingleArticle from './components/SingleArticle';
import ErrorMessage from './components/ErrorMessage';
import styled from 'styled-components';

const AppContainer = styled.div`
margin: 0 auto;
padding: 0;
`
const StyledContainer = styled.div`
margin: 0 auto;
min-width: 400px;
max-width: 800px;
`

class App extends Component {
  state = {
    user: {},
    isLoggedIn: false,
  };

  // Maybe doesn't make a request for user info until user clicks sign-in
  // opens an input field for a username
  // make a get request for users/username
  // if the user name exists then data is returned and the state is populated
  // else no data and returns a create account page.

  render() {
    return (
      <AppContainer>
        <Header userInfo={this.state} />
        <StyledContainer>
          <Router>
            <ArticlesList path="/" />
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
