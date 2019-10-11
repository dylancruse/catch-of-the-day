import React, { Component } from 'react';
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

  addToOrder = key => {
    const { order } = this.state;
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  render() {
    const { fishes, order } = this.state;
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
        <Order fishes={fishes} order={order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}
