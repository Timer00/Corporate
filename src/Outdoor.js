import React, { Component } from 'react';
//import Koji from '@withkoji/vcc';
import Koji from './mock.json';
import './App.css';

class Outdoor extends Component {
    constructor(props) {
    super(props);
    this.state = {
      companyName: '',
    };
  }

  componentDidMount() {
      //let companyName = window.prompt('What is your company name?','MONOPOLY INC');
      this.setState({companyName: 'companyName'});
  }

  render() {
    return (
      <div className='outdoor-section'>
        <div className='outdoor-floor'>
          <div>{this.state.companyName}</div>
        </div>
      </div>
    );
  }
}

export default Outdoor;
