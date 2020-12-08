import { Link } from '@reach/router';
import React from 'react';

const Header = ({ userInfo }) => {
    // console.log(userInfo.user.username, '<<<<< user obj')
    // console.log(userInfo.isLoggedIn, '<<<<< logged in status')
    return (
        <header>
            <Link to="/">
                <h1>NC News</h1>
            </Link>
            <p>Header - Topics drop down to go here</p>
            <div>
                {userInfo.isLoggedIn ? <Link to="/"><p>Hello, {userInfo.user.username}</p></Link> : <Link to="/"><p>Sign-in</p></Link>}
            </div>
        </header>
    );
};

export default Header;