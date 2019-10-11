import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Order extends Component {
  render() {
    const { fishes, order } = this.props;
    const orderIds = Object.keys(order);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        {orderIds}
        <ul></ul>
      </div>
    );
  }
}

Order.propTypes = {
  fishes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
};
