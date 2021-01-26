import { navigate } from '@reach/router';
import React, { Component } from 'react';
import cardStyle from './styles/card.module.css';
import buttonStyle from './styles/button.module.css';
import articleStyle from './styles/article.module.css';

class SignIn extends Component {
  state = {
    username: '',
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    const { username } = this.state;
    const { authenticateUser } = this.props;

    event.preventDefault();
    authenticateUser(username);
    this.setState({ username: '' });
    navigate('/');
  };

  render() {
    return (
      <div className={cardStyle.card}>
        <div className={articleStyle.signInContainer}>
          <form onSubmit={this.handleSubmit}>
            <label>
              Sign in to your account:
              <br />
              <input
                type='text'
                name='username'
                className={articleStyle.signInInput}
                onChange={this.handleChange}
                value={this.state.username}
              />
              <br />
              <button
                type='submit'
                onClick={this.handleChange}
                className={buttonStyle.button}
              >
                Sign In
              </button>
            </label>
          </form>
          <p>
            Hello! Thank you for taking the time to have a look at my work!{' '}
            <br />
            To make the most of this demo you can sign in using
            <span> 'tickle122'</span>.
          </p>
        </div>
      </div>
    );
  }
}

export default SignIn;
