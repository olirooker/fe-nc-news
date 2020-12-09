import React, { Component } from 'react';
import { Link, navigate } from '@reach/router';
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

        return (
            <header>
                <Link to="/"><h1>NC News</h1></Link>
                <div>
                    <label>
                        <select defaultValue="" onChange={(event) => { navigate(`/${event.target.value}/articles`) }}>
                            <option key="topic-placeholder" disabled={true} value="">Select a topic</option>
                            {this.state.topics.map(topic => {
                                return (
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