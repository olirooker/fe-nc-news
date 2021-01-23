import React from 'react';
import { Link } from '@reach/router';
import moment from 'moment';
import Vote from './Vote';
import userAvatar from '../assets/nc-avatar-01.svg';
import articleStyle from './styles/article.module.css';
import cardStyle from './styles/card.module.css';

const ArticleCard = ({ article }) => {
  let topicClass;
  if (article.topic === 'cooking') topicClass = articleStyle.topicCooking;
  else if (article.topic === 'football')
    topicClass = articleStyle.topicFootball;
  else if (article.topic === 'coding') topicClass = articleStyle.topicCoding;
  else topicClass = articleStyle.topic;

  return (
    <div className={cardStyle.articleCard}>
      <div className={articleStyle.articleDetailsContainer}>
        <div className={articleStyle.postDetailsContainer}>
          <img
            className={articleStyle.userAvatar}
            src={userAvatar}
            alt='user avatar'
          />
          <div className={articleStyle.postDetails}>
            <Link
              to={`/users/${article.author}/articles`}
              className={articleStyle.author}
            >
              {article.author}
            </Link>
            <p className={articleStyle.time}>
              {moment(article.created_at).fromNow()}
            </p>
          </div>
        </div>
        <Link
          to={`/articles/${article.article_id}`}
          className={articleStyle.title}
        >
          {article.title}
        </Link>
        <div className={articleStyle.tagsContainer}>
          <Link to={`/${article.topic}/articles`} className={topicClass}>
            #{article.topic}
          </Link>
          <Link
            to={`/articles/${article.article_id}`}
            className={articleStyle.comments}
          >
            {article.comment_count} Comments
          </Link>
        </div>
      </div>

      <div className={articleStyle.reactions}>
        <div className={articleStyle.votes}>
          <Vote votes={article.votes} article_id={article.article_id} />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
