import React, { Component } from 'react';
import SignInButton from './SignInButton';
import CreateAccountButton from './CreateAccountButton';
import articleStyle from './styles/article.module.css';
import cardStyle from './styles/card.module.css';
import buttonStyle from './styles/button.module.css';

class CommentAdder extends Component {
  state = {
    body: '',
    buttonPress: false,
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    const { body } = this.state;
    const { addComment, user } = this.props;

    event.preventDefault();
    addComment({ body, username: user.username });
    this.setState({ body: '' });
  };

  handleButtonPress = (event) => {
    event.preventDefault();
    this.setState((currentState) => {
      return { buttonPress: !currentState.buttonPress };
    });
  };

  render() {
    const { buttonPress } = this.state;
    const { user } = this.props;

    return (
      <div className={cardStyle.articleAdderCard}>
        <button
          className={buttonStyle.fullWidth}
          onClick={this.handleButtonPress}
        >
          Post A Comment
        </button>

        {buttonPress ? (
          user.username ? (
            <div className={articleStyle.userSignedIn}>
              <form onSubmit={this.handleSubmit}>
                <label className={articleStyle.adderLabel}>
                  Add a comment:
                  <textarea
                    className={articleStyle.adderTextarea}
                    type='text'
                    name='body'
                    onChange={this.handleChange}
                    value={this.state.body}
                    placeholder='Comment body...'
                    required
                  ></textarea>
                </label>
                <button type='submit' className={buttonStyle.postButton}>
                  Post
                </button>
              </form>
            </div>
          ) : (
            <div className={articleStyle.userSignedOut}>
              <p>
                You must be signed in to post a comment. Please sign in or
                create an account.
              </p>
              <div className={articleStyle.buttonContainer}>
                <SignInButton />
                <CreateAccountButton />
              </div>
            </div>
          )
        ) : null}
      </div>
    );
  }
}

export default CommentAdder;
