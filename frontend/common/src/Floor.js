import React, { Component } from 'react';

import './App.css';

class Floor extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.profit = setInterval(()=>{
      this.props.profit(this.props.profitRate);
      this.props.loss(this.props.lossRate);
    },1000);
    this.props.floorCount(this.props.type,true);
  }

  render() {
    return (
      <div className='section'>
        <div className='floor'>
          <img alt='' src={this.props.image}/>
        </div>
      </div>
    );
  }
}

export default Floor;
