import React, { Component } from 'react';
import SignInButton from './SignInButton';
import CreateAccountButton from './CreateAccountButton';
import ErrorMessage from './ErrorMessage';
import { postComment } from '../api';
import inputStyle from './styles/input.module.css';
import cardStyle from './styles/card.module.css';
import buttonStyle from './styles/button.module.css';
import iconStyle from './styles/icon.module.css';
import LoadingButton from './LoadingButton';
import { TiTick } from 'react-icons/ti';

class CommentAdder extends Component {
  state = {
    body: '',
    hasError: false,
    errorMessage: '',
    buttonPress: false,
    postButtonPress: false,
    postIsLoading: false,
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    const { body } = this.state;
    const { addComment, user, article_id } = this.props;

    event.preventDefault();

    const newComment = {
      body,
      username: user.username,
    };

    this.setState({ postButtonPress: true, postIsLoading: true });

    postComment(newComment, article_id)
      .then((comment) => {
        addComment(comment);
        this.setState({
          body: '',
          postIsLoading: false,
        });
      })
      .catch((err) => {
        const {
          response: { status, statusText },
        } = err;
        this.setState({
          hasError: true,
          errorMessage: `Cannot post comment ... ${status}. ${statusText}`,
        });
      });
  };

  handleButtonPress = (event) => {
    event.preventDefault();
    this.setState((currentState) => {
      return { buttonPress: !currentState.buttonPress, postButtonPress: false };
    });
  };

  render() {
    const {
      hasError,
      errorMessage,
      buttonPress,
      postButtonPress,
      postIsLoading,
    } = this.state;
    const { user } = this.props;

    return (
      <div className={cardStyle.articleAdderCard}>
        <button
          className={buttonStyle.fullWidth}
          onClick={this.handleButtonPress}
        >
          Post A Comment
        </button>
        {hasError ? (
          <ErrorMessage errorMessage={errorMessage} />
        ) : buttonPress ? (
          user.username ? (
            <div className={inputStyle.userSignedIn}>
              <form onSubmit={this.handleSubmit}>
                <label className={inputStyle.adderLabel}>
                  Add a comment:
                  <textarea
                    className={inputStyle.adderTextarea}
                    type='text'
                    name='body'
                    onChange={this.handleChange}
                    value={this.state.body}
                    placeholder='Comment body...'
                    required
                  ></textarea>
                </label>
                <button type='submit' className={buttonStyle.postButton}>
                  {postButtonPress ? (
                    postIsLoading ? (
                      <LoadingButton />
                    ) : (
                      <TiTick className={iconStyle.tick} />
                    )
                  ) : (
                    <>Post</>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className={inputStyle.userSignedOut}>
              <p>
                You must be signed in to post a comment. Please sign in or
                create an account.
              </p>
              <div className={inputStyle.buttonContainer}>
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
