import React, { Component } from 'react';
import TopicCard from './TopicCard';

class TopicsList extends Component {
    state = {};

    render() {
        return (
            <div>
                <h1>Topics List</h1>
                <p>Topics List - List of topic cards</p>
                <TopicCard />
            </div>
        );
    }
}

export default TopicsList;