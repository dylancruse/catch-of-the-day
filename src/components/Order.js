import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { formatPrice } from '../helpers';

export default class Order extends Component {
  renderOrder = key => {
    const { fishes, order, removeFromOrder } = this.props;
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === 'available';
    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: { enter: 500, exit: 500 },
    };

    // make sure the fish is loaded from firebase
    if (!fish) return null;

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            {fish ? fish.name : 'fish'} no longer available 😫
            <button type="button" onClick={() => removeFromOrder(key)}>
              &times;
            </button>
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name} {formatPrice(count * fish.price)}
          </span>
          <button type="button" onClick={() => removeFromOrder(key)}>
            &times;
          </button>
        </li>
      </CSSTransition>
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
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
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
