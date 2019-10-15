import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

export default class Order extends Component {
  renderOrder = key => {
    const { fishes, order, removeFromOrder } = this.props;
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === 'available';
    // make sure the fish is loaded from firebase
    if (!fish) return null;
    if (!isAvailable) {
      return (
        <li key={key}>
          {fish ? fish.name : 'fish'} is no longer available 😫
          <button type="button" onClick={() => removeFromOrder(key)}>
            &times;
          </button>
        </li>
      );
    }
    return (
      <li key={key}>
        {count} lbs {fish.name} {formatPrice(count * fish.price)}
        <button type="button" onClick={() => removeFromOrder(key)}>
          &times;
        </button>
      </li>
    );
  };

  render() {
    const { fishes, order } = this.props;
    const orderIds = Object.keys(order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key];
      const count = order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">{orderIds.map(this.renderOrder)}</ul>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

Order.propTypes = {
  fishes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  removeFromOrder: PropTypes.func.isRequired,
};
