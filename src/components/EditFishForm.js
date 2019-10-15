import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EditFishForm extends Component {
  handleChange = e => {
    const { fish, index, updateFish } = this.props;
    // update that feesh
    const updatedFish = {
      ...fish,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    updateFish(index, updatedFish);
  };

  render() {
    const { fish, index, deleteFish } = this.props;
    return (
      <div className="fish-edit">
        <input
          value={fish.name}
          onChange={this.handleChange}
          type="text"
          name="name"
        />
        <input
          value={fish.price}
          onChange={this.handleChange}
          type="text"
          name="price"
        />
        <select
          value={fish.status}
          onChange={this.handleChange}
          type="text"
          name="status"
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea
          value={fish.desc}
          onChange={this.handleChange}
          name="desc"
        ></textarea>
        <input
          value={fish.image}
          onChange={this.handleChange}
          type="text"
          name="image"
        />
        <button type="button" onClick={() => deleteFish(index)}>
          Remove fish
        </button>
      </div>
    );
  }
}

EditFishForm.propTypes = {
  fish: PropTypes.object.isRequired,
  index: PropTypes.string.isRequired,
  updateFish: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
};
