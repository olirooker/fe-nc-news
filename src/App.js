import React, { Component } from 'react';
import { navigate, Router } from '@reach/router';
import ArticlesList from './components/ArticlesList';
import TopicsList from './components/TopicsList';
import UsersList from './components/UsersList';
import SingleArticle from './components/SingleArticle';
import ErrorMessage from './components/ErrorMessage';
import SignIn from './components/SignIn';
import Header from './components/Header';
import styled from 'styled-components';
import { getUser } from './api';

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
      this.setState({ user: user });
    });
  };

  signOut = () => {
    this.setState({ user: {} });
    navigate('/');
  };

  // cDU to see if the state changes then re render

  render() {
    return (
      <AppContainer>
        <Header user={this.state.user} signOut={this.signOut} />
        <StyledContainer>
          <Router>
            <ArticlesList path='/' user={this.state.user} />
            <SignIn path='/signin' authenticateUser={this.authenticateUser} />
            <ArticlesList path='/:topic/articles' user={this.state.user} />
            <ArticlesList
              path='/users/:username/articles'
              user={this.state.user}
            />
            <SingleArticle
              path='/articles/:article_id'
              user={this.state.user}
            />
            <TopicsList path='/topics' />
            <UsersList path='/users/:username' />
            <ErrorMessage default errorMessage='Page not found!' />
          </Router>
        </StyledContainer>
      </AppContainer>
    );
  }
}

export default App;
