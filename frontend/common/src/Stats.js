import React, { Component } from 'react';
import Koji from '@withkoji/vcc';
//import Koji from './mock.json';

import './App.css';

function Stats(props) {
  if (props.show) {
    return (
      <div className='stats-container'>
        <div className='stats'>
          <div className='stats-title'>
            <div className='upgrades-title-text center-content'>{Koji.config.strings.stats}</div>
          </div>

          <div className='stats-statistics center-content'>
            <div className='stats-statistics-title center-content'>{Koji.config.strings.statistics}</div>
            <div className='stats-statistics-table'>
              <div className='stats-statistics-table-left'>
                <div className='stats-statistics-table-item center-content'>{Koji.config.strings.totalMoney}</div>
                <div className='stats-statistics-table-item center-content'>{Koji.config.strings.constructionSpent}</div>
                <div className='stats-statistics-table-item center-content'>{Koji.config.strings.upgradesSpent}</div>
                <div className='stats-statistics-table-item center-content'>{Koji.config.strings.maintenanceSpent}</div>
              </div>
              <div className='stats-statistics-table-right'>
                <div className='stats-statistics-table-item center-content'>{props.totalCash}</div>
                <div className='stats-statistics-table-item center-content'>{props.constructionExpenses}</div>
                <div className='stats-statistics-table-item center-content'>{props.upgradeExpenses}</div>
                <div className='stats-statistics-table-item center-content'>{props.maintenanceExpenses}</div>
              </div>
            </div>
          </div>
          <div className='stats-netProfit'>
            <div className='stats-netProfit-left center-content'>{Koji.config.strings.netProfit}</div>
            <div className='stats-netProfit-right center-content'>{props.totalCash - props.constructionExpenses - props.upgradeExpenses - props.maintenanceExpenses}</div>
          </div>
          <div className='stats-statistics'>
            <div className='stats-statistics-title center-content'>{Koji.config.strings.revenueExpenditure}</div>
            <div className='stats-statistics-table'>
              <div className='stats-statistics-table-left'>
                <div className='stats-statistics-table-item center-content'>{Koji.config.strings.gross}</div>
                <div className='stats-statistics-table-item center-content'>{Koji.config.strings.maintenanceSec}</div>
                <div className='stats-statistics-table-item center-content'>{Koji.config.strings.netIncome}</div>
              </div>
              <div className='stats-statistics-table-right'>
                <div className='stats-statistics-table-item center-content'>{props.totalCashSec}</div>
                <div className='stats-statistics-table-item center-content'>{props.maintananceSec}</div>
                <div className='stats-statistics-table-item center-content'>{props.totalCashSec - props.maintananceSec}</div>
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

export default Stats;
