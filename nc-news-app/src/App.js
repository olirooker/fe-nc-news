import React, { Component } from 'react';
import { Router } from "@reach/router";
import Header from './components/Header';
import ArticlesList from './components/ArticlesList';
import TopicsList from './components/TopicsList';
import UsersList from './components/UsersList';

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
      <div>
        <Header userInfo={this.state} />
        <Router>
          <ArticlesList path="/" />
          <ArticlesList path="/:topic/articles" />
          <ArticlesList path="/users/:username/articles" />
          <TopicsList path="/topics" />
          <UsersList path="/:username" />
        </Router>
      </div>
    );
  }
}

export default App;
