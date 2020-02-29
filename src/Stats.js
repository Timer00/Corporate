import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
//import Koji from '@withkoji/vcc';
import Koji from './mock.json';

import upgrade_mush from './images/upgrades-icon-mushroom.png'

import 'swiper/css/swiper.css';

import './App.css';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.show) {
      return (
        <div className='stats-container'>
          <div className='stats'>
            <div className='upgrades-title'>
              <div className='upgrades-title-text'>STATS</div>
            </div>

            <div className='stats-statistics center-content'>
              <div className='stats-statistics-title center-content'>STATISTICS</div>
              <div className='stats-statistics-table'>
                <div className='stats-statistics-table-left'>
                  <div className='stats-statistics-table-item center-content'>Total money earned:</div>
                  <div className='stats-statistics-table-item center-content'>Construction expenses:</div>
                  <div className='stats-statistics-table-item center-content'>Upgrade expenses:</div>
                  <div className='stats-statistics-table-item center-content'>Maintenance expenses:</div>
                </div>
                <div className='stats-statistics-table-right'>
                  <div className='stats-statistics-table-item center-content'>{this.props.totalCash}</div>
                  <div className='stats-statistics-table-item center-content'>{this.props.constructionExpenses}</div>
                  <div className='stats-statistics-table-item center-content'>{this.props.upgradeExpenses}</div>
                  <div className='stats-statistics-table-item center-content'>{this.props.maintenanceExpenses}</div>
                </div>
              </div>
            </div>
            <div className='stats-netProfit'>
              <div className='stats-netProfit-left center-content'>NET PROFIT</div>
              <div className='stats-netProfit-right center-content'>{this.props.totalCash-this.props.constructionExpenses-this.props.upgradeExpenses-this.props.maintenanceExpenses}</div>
            </div>
            <div className='stats-statistics'>
              <div className='stats-statistics-title center-content'>REVENUE and EXPENDITURE</div>
              <div className='stats-statistics-table'>
                <div className='stats-statistics-table-left'>
                  <div className='stats-statistics-table-item center-content'>Gross per sec:</div>
                  <div className='stats-statistics-table-item center-content'>Maintenance per sec:</div>
                  <div className='stats-statistics-table-item center-content'>Net income per sec:</div>
                </div>
                <div className='stats-statistics-table-right'>
                  <div className='stats-statistics-table-item center-content'>{this.props.totalCashSec}</div>
                  <div className='stats-statistics-table-item center-content'>{this.props.maintananceSec}</div>
                  <div className='stats-statistics-table-item center-content'>{this.props.totalCashSec-this.props.maintananceSec}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Stats;
