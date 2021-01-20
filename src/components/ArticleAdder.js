import React, { Component } from 'react';
import { postArticle } from '../api';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';
import SignInButton from './SignInButton';
import CreateAccountButton from './CreateAccountButton';

const StyledArticleAdder = styled.section`
  margin: 1.8rem 0;
  padding: 0.8rem;
  background-color: white;
  border: 1px solid #b5bdc4;
  border-radius: 1rem;
  box-shadow: 1.5px 3px 4px #888888;

  @media screen and (max-width: 600px) {
    border-radius: 0rem;
  }
`;
const PostArticleButton = styled.button`
  width: 100%;
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 600;
  border: 1px solid #256ce1;
  outline: none;
  transition: all 300ms ease-in-out;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    transition: all 300ms ease-in-out;
    background: #fff;
    color: #256ce1;
  }
`;
const UserSignedOut = styled.div`
  display: block;
  text-align: center;
  margin: 3rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem;
`;
const UserSignedIn = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;
const Label = styled.label`
  display: block;
  width: 50vw;
  font-size: 1.6rem;
  font-weight: 500;
`;
const Input = styled.input`
  width: stretch;
  padding: 1rem;
  border: 1px solid #b5bdc4;
  border-radius: 4px;
  margin: 0.4rem 0 1rem 0;
`;
const BodyTextarea = styled.textarea`
  min-width: stretch;
  max-width: stretch;
  padding: 1rem;
  border: 1px solid #b5bdc4;
  border-radius: 4px;
`;
const PostButton = styled.button`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  margin-top: 1rem;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 600;
  border: 1px solid #256ce1;
  outline: none;
  transition: all 300ms ease-in-out;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    transition: all 300ms ease-in-out;
    background: #fff;
    color: #256ce1;
  }
`;

class ArticleAdder extends Component {
  state = {
    body: '',
    title: '',
    topic: '',
    hasError: false,
    errorMessage: '',
    buttonPress: false,
  };

  handleButtonPress = (event) => {
    event.preventDefault();
    this.setState((currentState) => {
      return { buttonPress: !currentState.buttonPress };
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
        this.setState({ body: '', title: '', topic: '' });
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
    const { hasError, errorMessage, buttonPress } = this.state;
    const { user } = this.props;

    return (
      <StyledArticleAdder>
        <PostArticleButton onClick={this.handleButtonPress}>
          Post An Article
        </PostArticleButton>
        {hasError ? (
          <ErrorMessage errorMessage={errorMessage} />
        ) : buttonPress ? (
          user.username ? (
            <UserSignedIn>
              <form onSubmit={this.handleSubmit}>
                <Label>
                  Topic:
                  <Input
                    type='text'
                    name='topic'
                    id='topic'
                    value={this.state.topic}
                    placeholder='Which topic do you want to post about?'
                    onChange={this.handleChange}
                    required
                  />
                </Label>
                <Label>
                  Title:
                  <Input
                    type='text'
                    name='title'
                    id='title'
                    value={this.state.title}
                    placeholder='Post Title'
                    onChange={this.handleChange}
                    required
                  />
                </Label>
                <Label>
                  Body:
                  <BodyTextarea
                    type='text'
                    name='body'
                    id='body'
                    resize='none'
                    value={this.state.body}
                    placeholder='Article body...'
                    onChange={this.handleChange}
                    required
                  ></BodyTextarea>
                </Label>
                <PostButton type='submit'>Post</PostButton>
              </form>
            </UserSignedIn>
          ) : (
            <UserSignedOut>
              <p>
                You must be signed in to post an article. Please sign in or
                create an account.
              </p>
              <ButtonContainer>
                <SignInButton />
                <CreateAccountButton />
              </ButtonContainer>
            </UserSignedOut>
          )
        ) : null}
      </StyledArticleAdder>
    );
  }
}

export default ArticleAdder;
