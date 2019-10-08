import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore = e => {
    const { history } = this.props;
    e.preventDefault();
    const storeName = this.myInput.current.value;
    history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form onSubmit={this.goToStore} className="store-selector">
        <h2>Please Enter Your Store</h2>
        <input
          type="text"
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={this.myInput}
          required
        />
        <button type="submit">Visit Store →</button>
      </form>
    );
  }
}

StorePicker.propTypes = {
  history: PropTypes.object.isRequired,
};

export default StorePicker;
