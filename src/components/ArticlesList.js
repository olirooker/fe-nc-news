import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticleCard from './ArticleCard';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import Query from './Query';
import ArticleAdder from './ArticleAdder';
import bannerStyle from './styles/banner.module.css';

class ArticlesList extends Component {
  state = {
    articles: [],
    isLoading: true,
    hasError: false,
    errorMessage: '',
    order: 'desc',
    sort_by: 'created_at',
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
    const { topic, username, user } = this.props;

    let bannerClass;
    if (topic === 'cooking') bannerClass = bannerStyle.cookingBanner;
    else if (topic === 'football') bannerClass = bannerStyle.footballBanner;
    else if (topic === 'coding') bannerClass = bannerStyle.codingBanner;
    else if (username) bannerClass = bannerStyle.usernameBanner;
    else bannerClass = bannerStyle.articlesBanner;

    if (isLoading) {
      return <Loading />;
    } else if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return (
        <main>
          <div className={bannerClass}>
            <div className={bannerStyle.pageTitle}>
              {(topic && topic[0].toUpperCase() + topic.slice(1)) ||
                username ||
                'NC News'}
            </div>
          </div>
          <ArticleAdder addArticle={this.addArticle} user={user} />
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
