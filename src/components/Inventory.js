/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

export default class Inventory extends Component {
  state = {
    uid: '0',
    owner: '-1',
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    const { storeId } = this.props;
    // 1. Look up the current store in firebase
    const store = await base.fetch(storeId, { context: this });
    // 2. Claim it if there isn't an owner already
    if (!store.owner) {
      base.post(`${storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    // 3. Set state of inventory component to reflect current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log('Logging out!');
    await firebase.auth().signOut();
    this.setState({ uid: '0' });
  };

  render() {
    const { uid, owner } = this.state;
    const {
      fishes,
      addFish,
      updateFish,
      deleteFish,
      loadSampleFishes,
    } = this.props;

    const logoutButton = (
      <button type="button" onClick={this.logout}>
        Logout
      </button>
    );

    // Check if user is logged in
    if (uid === '0') {
      return <Login authenticate={this.authenticate} />;
    }

    // Check if user is not the owner
    if (uid !== owner) {
      return (
        <div>
          <p>Only the store owner is able to edit the inventory 😬</p>
          {logoutButton}
        </div>
      );
    }

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logoutButton}
        {Object.keys(fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={fishes[key]}
            updateFish={updateFish}
            deleteFish={deleteFish}
          />
        ))}
        <AddFishForm addFish={addFish} />
        <button onClick={loadSampleFishes} type="button">
          Load Sample Fishes
        </button>
        {logoutButton}
      </div>
    );
  }
}

Inventory.propTypes = {
  addFish: PropTypes.func.isRequired,
  updateFish: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
  loadSampleFishes: PropTypes.func.isRequired,
  fishes: PropTypes.object.isRequired,
  storeId: PropTypes.string.isRequired,
};
