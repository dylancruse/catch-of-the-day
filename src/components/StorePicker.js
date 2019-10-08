import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore = e => {
    e.preventDefault();
    console.log(this.myInput.current.value);
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

export default StorePicker;
