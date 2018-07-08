import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../actions/index';

class Header extends Component {

  handleSignOut = (e) => {
    e.preventDefault();
    this.props.actions.signOut();
    this.props.history.push('/signin');
  }

  render() {
    return (
      <header>
        <nav className='uk-navbar-container uk-navbar'>
          <div className='uk-navbar-left'>
            <ul className='uk-navbar-nav'>
              <li>
                <a
                  className='uk-navbar-toggle uk-navbar-toggle-icon'
                  href='#'
                />
              </li>
              <li>
                <Link to='/' className='uk-text-muted'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/dashboard' className='uk-text-muted'>
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className='uk-navbar-right'>
            <ul className='uk-navbar-nav'>
              <li><a href='/sign_out' onClick={(event) => this.handleSignOut(event)}>Sign out</a></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

function mapStateToProps({ user }) {  
  return { user };
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));