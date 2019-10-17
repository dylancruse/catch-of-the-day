import React, { Component } from 'react';
import PropTypes from 'prop-types';
import base from '../base';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

export default class App extends Component {
  state = {
    fishes: {},
    order: {},
  };

  componentDidMount() {
    const { match } = this.props;
    const { storeId } = match.params;
    // first reinstate localStorage
    const localStorageRef = localStorage.getItem(storeId);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef),
      });
    }
    // then bind fishes state to firebase
    this.ref = base.syncState(`${storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    const { order } = this.state;
    const { match } = this.props;
    const { storeId } = match.params;
    // save order state in localStorage
    localStorage.setItem(storeId, JSON.stringify(order));
  }

  componentWillUnmount() {
    // remove firebase binding
    base.removeBinding(this.ref);
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: { ...sampleFishes },
    });
  };

  addFish = fish => {
    const { fishes } = this.state;
    // add new fish to state
    fishes[`fish${Date.now()}`] = fish;
    this.setState({
      fishes,
    });
  };

  updateFish = (key, fish) => {
    const { fishes } = this.state;
    fishes[key] = fish;
    this.setState({ fishes });
  };

  deleteFish = key => {
    const { fishes } = this.state;
    fishes[key] = null;
    this.setState({ fishes });
  };

  addToOrder = key => {
    const { order } = this.state;
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  removeFromOrder = key => {
    const { order } = this.state;
    delete order[key];
    this.setState({ order });
  };

  render() {
    const { fishes, order } = this.state;
    const { match } = this.props;
    const { storeId } = match.params;
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="fresh feesh daily" />
          <ul className="fishes">
            {Object.keys(fishes).map(key => (
              <Fish
                details={fishes[key]}
                key={key}
                index={key}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={fishes}
          order={order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          fishes={fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          storeId={storeId}
        />
      </div>
    );
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
};
