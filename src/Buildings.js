import React, { Component } from 'react';
import Swiper from 'react-id-swiper';

import 'swiper/css/swiper.css';

import './App.css';

class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: false,
      floorCount: 0,
    }
  }

  purchaseFloor = () =>{
    this.props.purchaseFloor(this.props.cost,this.props.title,this.props.profitRate,this.props.lossRate, this.props.floorImage, this.props.floorCount);
    this.setState({floorCount: this.props.floorCount(this.props.title,false)});
    this.forceUpdate();
  };

  render = ()=>{
    return (
      <div className='building-container'>
        <div className='building-cost'>
          <div className='building-cost-value'>{'$'+this.props.cost}</div>
        </div>
        <div className='building-item'>
          {!this.state.info ?
            <>
              <div className='building-item-title'>{this.props.title}</div>
              <div className='building-item-icon'>
              <img alt='' src={this.props.icon}/>
              </div>
            </>
            :
            <div className='building-item-info-text'>
              {`Profit Rate: ${this.props.profitRate} /sec`}<br/>
              {`Loss Rate: ${this.props.lossRate} /sec`}<br/>
              {/*{`Building Count: ${this.state.floorCount}`}<br/>*/}
            </div>
          }
          <div className='building-item-info'>
            <div onClick={()=>this.setState({info: !this.state.info, floorCount: this.props.floorCount(this.props.title,false)})}>i</div>
          </div>
        </div>
        <div onClick={this.purchaseFloor} className='building-purchase'>PURCHASE</div>
      </div>
    )
  }
}

class Buildings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      floors: [],
    };
  }

  params = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };

  componentDidMount() {
    let floors = [];
    for (let i = 0; i < this.props.floors.length; i++){
      let floor = this.props.floors[i];
      floors.push(
        <div key={i} className='building'>
          <Building
            purchaseFloor={this.props.purchaseFloor}
            cost={floor.cost}
            title={floor.title}
            profitRate={floor.profitRate}
            lossRate={floor.lossRate}
            icon={floor.icon}
            floorImage={floor.image}
            floorCount={this.props.floorCount}
          />
        </div>
      )
    }
    console.log(floors);
    this.setState({floors: floors});
  }

  render() {
    if (this.props.show){
      return (
        <div className='buildings'>
          <Swiper {...this.params}>
            {this.state.floors}
          </Swiper>
        </div>
      );
    } else {
      return null;
    }

  }
}

export default Buildings;
