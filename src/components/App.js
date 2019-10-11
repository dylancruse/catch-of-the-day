import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

export default class App extends Component {
  state = {
    fishes: {},
  };

  addFish = fish => {
    const { fishes } = this.state;
    // add new fish to state
    fishes[`fish${Date.now()}`] = fish;
    this.setState({
      fishes,
    });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: { ...sampleFishes },
    });
  };

  render() {
    const { fishes } = this.state;
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="fresh feesh daily" />
          <ul className="fishes">
            {Object.keys(fishes).map(key => (
              <Fish details={fishes[key]} key={key} />
            ))}
          </ul>
        </div>
        <Order />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}
