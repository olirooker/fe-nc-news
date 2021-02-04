import { Link } from '@reach/router';
import React from 'react';
import cardStyle from './styles/card.module.css';
import articleStyle from './styles/article.module.css';

const TopicCard = ({ topic }) => {
  return (
    <div className={cardStyle.card}>
      <Link to={`/${topic.slug}/articles`} className={articleStyle.title}>
        <h3>{topic.slug[0].toUpperCase() + topic.slug.slice(1)}</h3>
      </Link>
      <p>{topic.description}</p>
    </div>
  );
};

export default TopicCard;
