import React, { Component } from 'react';
import { getTopics } from '../api';
import Loading from './Loading';
import TopicCard from './TopicCard';

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
        <h1>Topics List</h1>
        {isLoading ? (
          <Loading />
        ) : (
          <ul>
            {topics.map((topic) => {
              return <TopicCard topicData={topic} key={topic.slug} />;
            })}
          </ul>
        )}
      </main>
    );
  }
}

export default TopicsList;
