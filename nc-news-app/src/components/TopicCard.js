import { Link } from '@reach/router';
import React from 'react';

const TopicCard = ({ topicData }) => {
    return (
        <li>
            <Link to={`/${topicData.slug}/articles`}><h3>{topicData.slug}</h3></Link>
            <p>{topicData.description}</p>
        </li>
    )
};

export default TopicCard;