import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

export default class Fish extends Component {
  render() {
    const { details } = this.props;
    const { name, price, image, desc } = details;
    return (
      <li className="menu-fish">
        <img src={image} alt={name}></img>
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button type="button">Add To Cart</button>
      </li>
    );
  }
}

Fish.propTypes = {
  details: PropTypes.object.isRequired,
};
