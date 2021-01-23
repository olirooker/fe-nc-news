import React from 'react';
import { Link } from '@reach/router';
import moment from 'moment';
import Vote from './Vote';
import userAvatar from '../assets/nc-avatar-01.svg';
import style from './styles/article.module.css';

const ArticleCard = ({ article }) => {
  let topicClass;
  if (article.topic === 'cooking') topicClass = style.topicCooking;
  else if (article.topic === 'football') topicClass = style.topicFootball;
  else if (article.topic === 'coding') topicClass = style.topicCoding;
  else topicClass = style.topic;

  return (
    <div className={style.articleCard}>
      <div className={style.articleDetailsContainer}>
        <div className={style.postDetailsContainer}>
          <img
            className={style.userAvatar}
            src={userAvatar}
            alt='user avatar'
          />
          <div className={style.postDetails}>
            <Link
              to={`/users/${article.author}/articles`}
              className={style.author}
            >
              {article.author}
            </Link>
            <p className={style.time}>{moment(article.created_at).fromNow()}</p>
          </div>
        </div>
        <Link to={`/articles/${article.article_id}`} className={style.title}>
          {article.title}
        </Link>
        <div className={style.tagsContainer}>
          <Link to={`/${article.topic}/articles`} className={topicClass}>
            #{article.topic}
          </Link>
          <Link
            to={`/articles/${article.article_id}`}
            className={style.comments}
          >
            {article.comment_count} Comments
          </Link>
        </div>
      </div>

      <div className={style.reactions}>
        <div className={style.votes}>
          <Vote votes={article.votes} article_id={article.article_id} />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
