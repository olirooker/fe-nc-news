import React, { Component } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import Query from "./Query";
import styled from "styled-components";
import ArticleAdder from "./ArticleAdder";

const StyledHeader = styled.h1`
  margin: 1.5rem 0;
  padding: 5px 10px;
  background-color: white;
  border: 1px solid lightgrey;
  box-shadow: 3px 6px 8px #888888;
  text-align: center;
`;

class ArticlesList extends Component {
  state = {
    articles: [],
    isLoading: true,
    hasError: false,
    errorMessage: "",
    order: "desc",
    sort_by: "created_at",
  };

  componentDidMount() {
    const { topic, username } = this.props;

    getArticles(topic, username)
      .then((articles) => {
        this.setState({ articles, isLoading: false });
      })
      .catch((err) => {
        const {
          response: { status, statusText },
        } = err;
        this.setState({
          hasError: true,
          errorMessage: `Article not found ${status}. ${statusText}`,
          isLoading: false,
        });
      });
  }

  componentDidUpdate(prevProps, currentState) {
    const { topic, username } = this.props;
    const { order, sort_by } = this.state;
    const newTopic = prevProps.topic !== this.props.topic;
    const newUsername = prevProps.username !== this.props.username;
    const newOrder = currentState.order !== this.state.order;
    const newSort = currentState.sort_by !== this.state.sort_by;

    if (newTopic || newUsername || newOrder || newSort) {
      getArticles(topic, username, order, sort_by).then((articles) => {
        this.setState({ articles });
      });
    }
  }

  changeOrder = (newOrder) => {
    this.setState({ order: newOrder });
  };

  changeSort = (newSort) => {
    this.setState({ sort_by: newSort });
  };

  addArticle = (newArticle) => {
    this.setState((currentState) => {
      return { articles: [newArticle, ...currentState.articles] };
    });
  };

  render() {
    const { articles, isLoading, hasError, errorMessage } = this.state;
    const { topic, username } = this.props;

    if (isLoading) {
      return <Loading />;
    } else if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return (
        <main>
          <StyledHeader>{topic || username || "Home"}</StyledHeader>
          <ArticleAdder addArticle={this.addArticle} />
          <Query changeOrder={this.changeOrder} changeSort={this.changeSort} />
          <ul>
            {articles.map((article) => {
              return <ArticleCard article={article} key={article.article_id} />;
            })}
          </ul>
        </main>
      );
    }
  }
}

export default ArticlesList;
