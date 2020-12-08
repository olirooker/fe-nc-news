import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({ articleData }) => {
    return (
        <li>
            <div>
                <p><Link to={`/${articleData.topic}/articles`}>{articleData.topic}</Link>. Posted by <Link to={`/users/${articleData.author}/articles`}>{articleData.author}</Link> at {articleData.created_at}</p>
                <p>{articleData.votes}</p>
            </div>

            <div>
                <Link to={`/articles/${articleData.article_id}`}><h2>{articleData.title}</h2></Link>
                <Link to={`/articles/${articleData.article_id}`}><p>{articleData.body}</p></Link>
            </div>

            <div>
                <Link to={`/articles/${articleData.article_id}/comments`}><p>{articleData.comment_count}</p></Link>
            </div>
        </li>
    )
};

export default ArticleCard;