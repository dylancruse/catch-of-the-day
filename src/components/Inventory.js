import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';

export default class Inventory extends Component {
  render() {
    const { addFish, loadSampleFishes } = this.props;
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        <AddFishForm addFish={addFish} />
        <button onClick={loadSampleFishes} type="button">
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

Inventory.propTypes = {
  addFish: PropTypes.func.isRequired,
  loadSampleFishes: PropTypes.func.isRequired,
};
