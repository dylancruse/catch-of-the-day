import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Login extends Component {
  render() {
    const { authenticate } = this.props;
    return (
      <nav className="login">
        <h2>Inventory Login</h2>
        <p>Log in to manage your store's inventory</p>
        <button
          type="button"
          className="github"
          onClick={() => authenticate('Github')}
        >
          Log in with GitHub
        </button>
        <button
          type="button"
          className="twitter"
          onClick={() => authenticate('Twitter')}
        >
          Log in with Twitter
        </button>
        <button
          type="button"
          className="facebook"
          onClick={() => authenticate('Facebook')}
        >
          Log in with Facebook
        </button>
      </nav>
    );
  }
}

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};
