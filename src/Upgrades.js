import React, { Component } from 'react';

import './App.css';

function Upgrade(props) {
  return (
      <div className='upgrade'>
        <div className='upgrade-icon'>
          <img alt='' src={props.icon}/>
        </div>
        <div className='upgrade-text'>
          <div className='upgrade-text-title'>{props.title}</div>
          <div className='upgrade-text-cost'>
            <div className='upgrade-text-cost-value'>${props.cost}</div>
            <div className='upgrade-text-cost-purchase' onClick={()=>props.purchaseUpgrade(props.cost,props.multiplier)}>+</div>
          </div>
        </div>
      </div>
  );
}

class Upgrades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upgrades: [],
    };
  }

  componentDidMount() {
    let upgrades = [];
    console.log(this.props.upgrades);
    for (let i = 0; i < this.props.upgrades.length; i++){
      let upgrade = this.props.upgrades[i];
      upgrades.push(
        <Upgrade purchaseUpgrade={this.props.purchaseUpgrade} cost={upgrade.cost} multiplier={upgrade.multiplier} title={upgrade.title} icon={upgrade.icon}/>
        );
    }
    this.setState({upgrades: upgrades});
  }

  render() {
    if (this.props.show){
      return (
        <div className='upgrades'>
          <div className='upgrades-title'>
            <div className='upgrades-title-left'/>
            <div className='upgrades-title-text'>UPGRADES</div>
          </div>
          {this.state.upgrades}
        </div>
      );
    } else {
      return null;
    }

  }
}

export default Upgrades;
