import React, { Component } from 'react';
import { postArticle } from '../api';
import ErrorMessage from './ErrorMessage';
import SignInButton from './SignInButton';
import CreateAccountButton from './CreateAccountButton';
import articleStyle from './styles/article.module.css';
import cardStyle from './styles/card.module.css';
import buttonStyle from './styles/button.module.css';
import iconStyle from './styles/icon.module.css';
import LoadingButton from './LoadingButton';
import { TiTick } from 'react-icons/ti';

class ArticleAdder extends Component {
  state = {
    body: '',
    title: '',
    topic: '',
    hasError: false,
    errorMessage: '',
    buttonPress: false,
    postButtonPress: false,
    postIsLoading: false,
  };

  handleButtonPress = (event) => {
    event.preventDefault();
    this.setState((currentState) => {
      return {
        buttonPress: !currentState.buttonPress,
        postButtonPress: false,
      };
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    const { addArticle, user } = this.props;
    const { body, title, topic } = this.state;

    event.preventDefault();

    const newArticle = { body, username: user.username, title, topic };

    postArticle(newArticle)
      .then((article) => {
        addArticle(article);
        this.setState({
          body: '',
          title: '',
          topic: '',
          postButtonPress: true,
          postIsLoading: true,
        });
      })
      .then(() => {
        this.setState({ postIsLoading: false });
      })
      .catch((err) => {
        const {
          response: { status, statusText },
        } = err;

        this.setState({
          hasError: true,
          errorMessage: `Cannot post article ... ${status}. ${statusText}`,
        });
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
          className={buttonStyle.postArticleButton}
          onClick={this.handleButtonPress}
        >
          Post An Article
        </button>
        {hasError ? (
          <ErrorMessage errorMessage={errorMessage} />
        ) : buttonPress ? (
          user.username ? (
            <div className={articleStyle.userSignedIn}>
              <form onSubmit={this.handleSubmit}>
                <label className={articleStyle.adderLabel}>
                  Topic:
                  <input
                    className={articleStyle.adderInput}
                    type='text'
                    name='topic'
                    id='topic'
                    value={this.state.topic}
                    placeholder='Which topic do you want to post about?'
                    onChange={this.handleChange}
                    required
                  />
                </label>
                <label className={articleStyle.adderLabel}>
                  Title:
                  <input
                    className={articleStyle.adderInput}
                    type='text'
                    name='title'
                    id='title'
                    value={this.state.title}
                    placeholder='Post Title'
                    onChange={this.handleChange}
                    required
                  />
                </label>
                <label className={articleStyle.adderLabel}>
                  Body:
                  <textarea
                    className={articleStyle.adderTextarea}
                    type='text'
                    name='body'
                    id='body'
                    resize='none'
                    value={this.state.body}
                    placeholder='Article body...'
                    onChange={this.handleChange}
                    required
                  ></textarea>
                </label>
                <button className={buttonStyle.postButton} type='submit'>
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
            <div className={articleStyle.userSignedOut}>
              <p>
                You must be signed in to post an article. Please sign in or
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

export default ArticleAdder;
