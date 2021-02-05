import React, { Component } from 'react';
import cardStyle from './styles/card.module.css';
import userStyle from './styles/user.module.css';

class UsersList extends Component {
  state = {};

  render() {
    const { user } = this.props;
    return (
      <div className={cardStyle.card}>
        <div className={userStyle.userContainer}>
          <img
            src={user.avatar_url}
            alt='Your profile avatar'
            className={userStyle.userAvatar}
          />
          <div className={userStyle.userDetails}>
            <p className={userStyle.detail}>Name: {user.name}</p>
            <p className={userStyle.detail}>Username: {user.username}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersList;
