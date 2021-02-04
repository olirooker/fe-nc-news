import React, { Component } from 'react';
import { Link, navigate } from '@reach/router';
import { getTopics } from '../api';
import SignInButton from './SignInButton';
import CreateAccountButton from './CreateAccountButton';
import headerStyle from './styles/header.module.css';

class Header extends Component {
  state = {
    topics: [],
    isOpen: false,
  };

  componentDidMount() {
    getTopics().then((topics) => {
      this.setState({ topics });
    });
  }

  toggleMenu = (event) => {
    // event.preventDefault();
    this.setState((currentState) => {
      return { isOpen: !currentState.isOpen };
    }, console.log('toggle'));
  };

  //   openMenu = (event) => {
  //     event.preventDefault();
  //     console.log("open menu");

  //     this.setState({ isOpen: true }, () => {
  //       document.addEventListener("click", () => {
  //         this.closeMenu();
  //       });
  //     });
  //   };

  //   closeMenu = (event) => {
  //     console.log("close menu");
  //     console.log(event.target, "event target");
  //     if (!this.dropDown.current.contains(event.target)) {
  //       this.setState({ isOpen: false }, () => {
  //         document.removeEventListener("click", this.closeMenu);
  //       });
  //     }
  //   };

  render() {
    const { username, avatar_url } = this.props.user;
    const { signOut } = this.props;
    const { isOpen } = this.state;
    return (
      <div>
        <nav className={headerStyle.nav}>
          <div className={headerStyle.navContainer}>
            <Link to='/' className={headerStyle.navLink}>
              NC News
            </Link>
            <div className={headerStyle.topicsDropDown}>
              <label>
                <select
                  className={headerStyle.dropDownSelect}
                  defaultValue=''
                  onChange={(event) => {
                    navigate(event.target.value);
                  }}
                >
                  <option key='topic-placeholder' disabled={true} value=''>
                    Select a topic
                  </option>
                  <option key='all-topics' value='/'>
                    All Topics
                  </option>
                  {this.state.topics.map((topic) => {
                    return (
                      <option
                        key={topic.slug}
                        value={`/${topic.slug}/articles`}
                      >
                        {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
          </div>
          {username ? (
            <div
              className={headerStyle.navUserSignedIn}
              onClick={this.toggleMenu}
            >
              <div className={headerStyle.userMenu}>
                <img
                  src={avatar_url}
                  alt='Your profile avatar'
                  className={headerStyle.userAvatar}
                />
                <p className={headerStyle.userWelcome}>Hello, {username}</p>
                {isOpen ? (
                  <i className='fa fa-chevron-up'></i>
                ) : (
                  <i className='fa fa-chevron-down'></i>
                )}
              </div>
            </div>
          ) : (
            <div className={headerStyle.navUserSignedOut}>
              <SignInButton />
              <div className={headerStyle.mobileHide}>
                <CreateAccountButton />
              </div>
            </div>
          )}
        </nav>
        {isOpen ? (
          <div>
            <div className={headerStyle.dropDownList}>
              <div
                className={headerStyle.dropDownItem}
                onClick={() => {
                  navigate(`/users/${username}`);
                  this.toggleMenu();
                }}
              >
                <i className='fa fa-home'></i> My Account
              </div>
              <div
                className={headerStyle.dropDownItem}
                onClick={() => {
                  navigate(`/users/${username}/articles`);
                  this.toggleMenu();
                }}
              >
                <i className='fa fa-newspaper-o'></i> My Articles
              </div>
              <div
                className={headerStyle.dropDownItem}
                onClick={() => {
                  signOut();
                  this.toggleMenu();
                }}
              >
                <i className='fa fa-sign-out'></i> Sign Out
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Header;
