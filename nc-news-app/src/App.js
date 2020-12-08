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

  // get request to api/users to get user info if signed in.

  render() {
    return (
      <div>
        <Header userInfo={this.state} />
        <Router>
          <ArticlesList path="/" />
          <TopicsList path="/topics" />
          <UsersList path="/:username" />
        </Router>
      </div>
    );
  }
}

export default App;
