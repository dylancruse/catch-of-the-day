import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

export default class App extends Component {
  state = {
    fishes: {},
  };

  addFish = fish => {
    const { fishes } = this.state;
    fishes[`fish${Date.now()}`] = fish;
    this.setState({
      fishes,
    });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="fresh feesh daily" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}
