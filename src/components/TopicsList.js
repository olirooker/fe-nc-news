import React, { Component } from 'react';
import { getTopics } from '../api';
import Loading from './Loading';
import TopicCard from './TopicCard';
import bannerStyle from './styles/banner.module.css';

class TopicsList extends Component {
  state = {
    topics: [],
    isLoading: true,
  };

  componentDidMount() {
    getTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  }

  render() {
    const { topics, isLoading } = this.state;
    return (
      <main>
        <div className={bannerStyle.topicsBanner}>
          <h1 className={bannerStyle.pageTitle}>Topics</h1>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <ul>
            {topics.map((topic) => {
              return <TopicCard topic={topic} key={topic.slug} />;
            })}
          </ul>
        )}
      </main>
    );
  }
}

export default TopicsList;
