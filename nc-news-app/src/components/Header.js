import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getTopics } from '../api';

class Header extends Component {
    state = {
        topics: [],
    };

    componentDidMount() {
        getTopics().then((topics) => {
            this.setState({ topics });
        });
    };

    // sign in and create account components go here?

    render() {
        const { userInfo } = this.props

        // console.log(userInfo.user.username, '<<<<< user obj')
        // console.log(userInfo.isLoggedIn, '<<<<< logged in status')

        return (
            <header>
                <Link to="/"><h1>NC News</h1></Link>
                <div>
                    <label>
                        <select defaultValue="">
                            <option key="topic-placeholder" disabled={true} value="">Select a topic</option>
                            {this.state.topics.map(topic => {
                                return (
                                    // <Link to={`/${topic.slug}/articles`}></Link>
                                    <option key={topic.slug}>{topic.slug}</option>
                                )
                            })}
                        </select>
                    </label>
                </div>
                <div>
                    {userInfo.isLoggedIn ? <p>Hello, <Link to="/">{userInfo.user.username}</Link></p> : <Link to="/"><p>Sign-in</p></Link>}
                </div>
            </header>
        );
    }
}

export default Header;