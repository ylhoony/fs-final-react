import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header>
        <nav className="uk-navbar-container uk-navbar">
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li>
                <a
                  className="uk-navbar-toggle uk-navbar-toggle-icon"
                  href="#"
                />
              </li>
              <li>
                <Link to="/" className="uk-text-muted">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="uk-text-muted">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li><a>Sign out</a></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;