import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

export default class App extends Component {
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="fresh feesh daily" />
        </div>
        <Order />
        <Inventory />
      </div>
    );
  }
}
