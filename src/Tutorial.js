import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
//import Koji from '@withkoji/vcc';
import Koji from './mock.json';

import 'swiper/css/swiper.css';

import './App.css';

function Tutorial (props) {
  const [swiper, updateSwiper] = useState(null);
  let [companyName, setName] = useState('');

  const params = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  };

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  return (
    <Swiper {...params} getSwiper={updateSwiper}>
      <div className='tutorial'>
        <div className='tutorial-container'>
          <div className='tutorial-cost'>
            <div className='tutorial-cost-value'>{Koji.config.strings.tutorial_title_1}</div>
          </div>
          <div className='tutorial-item'>
            <div className='tutorial-item-title'>{Koji.config.strings.tutorial_subtitle_1}</div>
            <div className='tutorial-item-icon'>
              <img alt='' src={Koji.config.images["tutorial-icon"]}/>
            </div>
            <div className='tutorial-item-info center-content'>
              <span>{Koji.config.strings.tutorial_text_1}</span>
            </div>
          </div>
          <div onClick={goNext} className='tutorial-purchase'>{Koji.config.strings.tutorial_button_1}</div>
        </div>
      </div>
      <div className='tutorial'>
        <div className='tutorial-container'>
          <div className='tutorial-cost'>
            <div className='tutorial-cost-value'>{Koji.config.strings.tutorial_title_2}</div>
          </div>
          <div className='tutorial-item'>
            <div className='tutorial-item-title'>{Koji.config.strings.tutorial_subtitle_2}</div>
            <div className='tutorial-item-icon'>
              <img alt='' src={Koji.config.images["tutorial-icon-2"]}/>
            </div>
            <div className='tutorial-item-info center-content'>
              <span>{Koji.config.strings.tutorial_text_2}</span>
            </div>
          </div>
          <div onClick={goNext} className='tutorial-purchase'>{Koji.config.strings.tutorial_button_2}</div>
        </div>
      </div>
      <div className='tutorial'>
        <div className='tutorial-container tutorial-container-last'>
          <div className='tutorial-cost'>
            <div className='tutorial-cost-value'>{Koji.config.strings.tutorial_title_3}</div>
          </div>
          <div className='tutorial-item'>
            <div className='tutorial-item-title'>{Koji.config.strings.tutorial_subtitle_3}</div>
            <div className='tutorial-item-icon'>
              <input onChange={e=>setName(e.target.value)} type='text' placeholder='COMPANY INC'/>
            </div>
            <div className='tutorial-item-info center-content'>
              <span>{Koji.config.strings.tutorial_text_3}</span>
            </div>
          </div>
          <div onClick={()=>props.play(companyName)} className='tutorial-purchase'>{Koji.config.strings.tutorial_button_3}</div>
        </div>
      </div>
    </Swiper>
  );
};

export default Tutorial;
