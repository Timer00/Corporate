import React, { Component } from 'react';

import './App.css';
import Koji from '@withkoji/vcc';

import Button from '@material-ui/core/Button';

function Upgrade(props) {
  return (
      <div className='upgrade'>
        <div className='upgrade-icon center-content'>
          <img alt='' src={props.icon}/>
        </div>
        <div className='upgrade-text'>
          <div className='upgrade-text-title center-content'>{props.title}</div>
          <div className='upgrade-text-cost'>
            <div className='upgrade-text-cost-value center-content'>${props.cost}</div>
            <Button className='upgrade-text-cost-purchase center-content' onClick={()=>props.purchaseUpgrade(props.cost,props.multiplier)}>+</Button>
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
            <div className='upgrades-title-text center-content'>{Koji.config.strings.upgrades}</div>
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
