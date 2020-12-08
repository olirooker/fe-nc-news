import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({ article }) => {
    return (
        <li>
            <div>
                <p><Link to={`/${article.topic}/articles`}>{article.topic}</Link>. Posted by <Link to={`/users/${article.author}/articles`}>{article.author}</Link> at {article.created_at}</p>
                <p>{article.votes}</p>
            </div>

            <div>
                <Link to={`/articles/${article.article_id}`}><h2>{article.title}</h2></Link>
                <Link to={`/articles/${article.article_id}`}><p>{article.body}</p></Link>
            </div>

            <div>
                <Link to={`/articles/${article.article_id}/comments`}><p>{article.comment_count}</p></Link>
            </div>
        </li>
    )
};

export default ArticleCard;