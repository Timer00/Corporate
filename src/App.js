import React, { Component } from 'react';
//import Koji from '@withkoji/vcc';
import Koji from './mock.json';
import './App.css';

import Floor from './Floor';
import Buildings from './Buildings'

import stats_icon from './images/stats-icon.png';
import stats_icon_selected from './images/stats-icon-selected.png';
import build_icon from './images/build-icon.png';
import build_icon_selected from './images/build-icon-selected.png';
import upgrades_icon from './images/upgrades-icon.png';
import upgrades_icon_selected from './images/upgrades-icon-selected.png';

import Sky from "./Sky";
import Upgrades from "./Upgrades";
import Outdoor from "./Outdoor";
import Stats from "./Stats";
import Swiper from "react-id-swiper";
import Tutorial from "./Tutorial";

let startingCash = 500;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cash: startingCash,
      stats: [],
      totalCash: startingCash,
      totalCashSec: 0,
      constructionExpenses: 0,
      upgradeExpenses: 0,
      maintenanceExpenses: 0,
      maintenanceExpensesSec: 0,

      companyName: '',
      tutorial: true,
      multiplier: 1,
      display: 0,
      floorCount: [],
      floors: [
        <Floor
          key={0}
          type={Koji.config["floors-and-upgrades"].floors[0].title}
          profit={this.profit}
          loss={this.loss}
          profitRate={Koji.config["floors-and-upgrades"].floors[0].profitRate}
          lossRate={Koji.config["floors-and-upgrades"].floors[0].lossRate}
          image={Koji.config["floors-and-upgrades"].floors[0].image}
          floorCount={this.floorCount}
        />,]
    };
  }

  grossProfitTime = () => {
    let current = this.state.totalCash;
    this.grossTimeInterval = setTimeout(() => {
      let dif = this.state.totalCash - current;
      this.setState({totalCashSec: dif / 2});
      this.grossProfitTime();
    }, 2000)
  };

  grossMaintenanceTime = () => {
    let current = this.state.maintenanceExpenses;
    this.bmaintananceTimeInterval = setTimeout(() => {
      let dif = this.state.maintenanceExpenses - current;
      this.setState({maintenanceExpensesSec: dif / 2});
      this.grossMaintenanceTime();
    }, 2000)
  };


  floorCount = (type, increment) => {
    let floorCount = this.state.floorCount;
    if (increment) {
      if (typeof floorCount[type] === 'undefined') {
        floorCount[type] = 1;
      } else {
        floorCount[type]++;
      }
      this.setState({floorCount: floorCount});
    } else {
      return typeof floorCount[type] === 'undefined' ? 0 : floorCount[type];
    }
  };

  profit = (value) => {
    this.setState({cash: this.state.cash + value * this.state.multiplier, totalCash: this.state.totalCash + value * this.state.multiplier});
  };

  loss = (value) => {
    this.setState({cash: this.state.cash - value, maintenanceExpenses: this.state.maintenanceExpenses + value});
  };

  purchaseFloor = (cost, type, profitRate, lossRate, image) => {
    if (this.state.cash > cost) {
      this.setState(prevState => ({
        floors: [...prevState.floors,
          <Floor
            key={this.state.floors.length}
            type={type}
            profit={this.profit}
            profitRate={profitRate}
            loss={this.loss}
            lossRate={lossRate}
            image={image}
            floorCount={this.floorCount}
          />], cash: this.state.cash - cost, constructionExpenses: this.state.constructionExpenses + cost
      }));
    }
  };

  purchaseUpgrade = (cost, value) => {
    if (this.state.cash > cost) {
      this.setState({multiplier: this.state.multiplier + value, cash: this.state.cash - cost, upgradeExpenses: this.state.upgradeExpenses + cost});
    }
  };

  play = (name) => {
    this.setState({tutorial: false, companyName: name});
  };

  componentDidMount() {
    this.grossMaintenanceTime();
    this.grossProfitTime();
  }

  render() {
    return (
      <div className='container'>
        {this.state.tutorial ?
          <Tutorial play={this.play}/>
          :
          <>
            <div className='infoBar'>{'$' + this.state.cash}</div>
            <div className={`${this.state.display === 0 ? '' : 'hide'} game`}>
              {this.state.floors}
              <Outdoor companyName={this.state.companyName}/>
              <Sky/>
            </div>

            <Upgrades show={this.state.display === 1} purchaseUpgrade={this.purchaseUpgrade} upgrades={Koji.config["floors-and-upgrades"].upgrades}/>

            <Buildings show={this.state.display === 2} purchaseFloor={this.purchaseFloor} floors={Koji.config["floors-and-upgrades"].floors} floorCount={this.floorCount}
                       florCounut={this.state.floorCount}/>

            <Stats show={this.state.display === 3}
                   totalCash={this.state.totalCash} totalCashSec={this.state.totalCashSec} constructionExpenses={this.state.constructionExpenses}
                   upgradeExpenses={this.state.upgradeExpenses}
                   maintenanceExpenses={this.state.maintenanceExpenses} maintananceSec={this.state.maintenanceExpensesSec}/>

            <div className='toolbar'>
              <div className='item' onClick={() => this.setState({display: this.state.display === 1 ? 0 : 1})}>
                <div className={`${this.state.display === 1 ? 'selected' : ''}`}><img alt='' src={this.state.display === 1 ? upgrades_icon_selected : upgrades_icon}/></div>
              </div>
              <div className='item' onClick={() => {
                this.setState({display: this.state.display === 2 ? 0 : 2});
                let event = new Event('update');
                window.dispatchEvent(event);
              }}>
                <div className={`${this.state.display === 2 ? 'selected' : ''}`}><img alt='' src={this.state.display === 2 ? build_icon_selected : build_icon}/></div>
              </div>
              <div className='item' onClick={() => this.setState({display: this.state.display === 3 ? 0 : 3})}>
                <div className={`${this.state.display === 3 ? 'selected' : ''}`}><img alt='' src={this.state.display === 3 ? stats_icon_selected : stats_icon}/></div>
              </div>
            </div>
          </>
        }

      </div>
    );
  }
}

export default App;
