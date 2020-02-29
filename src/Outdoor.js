import React, { Component } from 'react';

import './App.css';

class Outdoor extends Component {
    constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='outdoor-section'>
        <div className='outdoor-floor'>
          <div>{this.props.companyName}</div>
        </div>
      </div>
    );
  }
}

export default Outdoor;
