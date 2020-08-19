import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import Koji from '@withkoji/vcc';
//import Koji from './mock.json';

import Button from '@material-ui/core/Button';


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
      <div className='tutorial center-content'>
        <div className='tutorial-container'>
          <div className='tutorial-cost'>
            <div className='tutorial-cost-value'>{Koji.config.strings.tutorial_title_1}</div>
          </div>
          <div className='tutorial-item'>
            <div className='center-content tutorial-item-title center-content'>{Koji.config.strings.tutorial_subtitle_1}</div>
            <div className='center-content tutorial-item-icon'>
              <img alt='' src={Koji.config.images.tutorial_icon}/>
            </div>
            <div className='center-content tutorial-item-info'>
              <span>{Koji.config.strings.tutorial_text_1}</span>
            </div>
          </div>
          <Button size='small' onClick={goNext} className='tutorial-purchase center-content button'>{Koji.config.strings.tutorial_button_1}</Button>
        </div>
      </div>
      <div className='tutorial center-content'>
        <div className='tutorial-container'>
          <div className='tutorial-cost'>
            <div className='tutorial-cost-value'>{Koji.config.strings.tutorial_title_2}</div>
          </div>
          <div className='tutorial-item'>
            <div className='tutorial-item-title center-content'>{Koji.config.strings.tutorial_subtitle_2}</div>
            <div className='tutorial-item-icon'>
              <img alt='' src={Koji.config.images.tutorial_icon_2}/>
            </div>
            <div className='tutorial-item-info center-content'>
              <span>{Koji.config.strings.tutorial_text_2}</span>
            </div>
          </div>
          <Button size='small' onClick={goNext} className='tutorial-purchase center-content button'>{Koji.config.strings.tutorial_button_2}</Button>
        </div>
      </div>
      <div className='tutorial center-content'>
        <div className='tutorial-container tutorial-container-last'>
          <div className='tutorial-cost'>
            <div className='tutorial-cost-value'>{Koji.config.strings.tutorial_title_3}</div>
          </div>
          <div className='tutorial-item'>
            <div className='tutorial-item-title center-content'>{Koji.config.strings.tutorial_subtitle_3}</div>
            <div className='tutorial-item-icon center-content'>
              <input onChange={e=>setName(e.target.value)} type='text' placeholder='COMPANY INC'/>
            </div>
            <div className='tutorial-item-info center-content'>
              <span>{Koji.config.strings.tutorial_text_3}</span>
            </div>
          </div>
          <Button size='small' onClick={()=>props.play(companyName)} className='tutorial-purchase center-content button'>{Koji.config.strings.tutorial_button_3}</Button>
        </div>
      </div>
    </Swiper>
  );
};

export default Tutorial;
