import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

export default class Fish extends Component {
  render() {
    const { details, index, addToOrder } = this.props;
    const { name, price, image, desc, status } = details;
    const isAvailable = status === 'available';

    return (
      <li className="menu-fish">
        <img src={image} alt={name}></img>
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => addToOrder(index)}
          type="button"
        >
          {isAvailable ? 'Add To Order' : 'Sold Out!'}
        </button>
      </li>
    );
  }
}

Fish.propTypes = {
  index: PropTypes.string.isRequired,
  details: PropTypes.object.isRequired,
  addToOrder: PropTypes.func.isRequired,
};
