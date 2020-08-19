import React, { Component } from 'react';

import './App.css';

function collision(a, b, type) {
  if (type === 'touch') {
    return (a.x + a.width > b.x) && (a.x < b.x + b.width) && (a.y + a.height > b.y) && (a.y < b.y + b.height);
  }
  if (type === 'inside') {
    return (a.x > b.x) && (a.x + a.width < b.x + b.width) && (a.y > b.y) && (a.y + a.height < b.y + b.height);
  }
}

function Cloud(x, y, width, height, speed, image, ctx) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.image = image;

  this.draw = () => {
    this.x -= this.speed;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

function generateClouds(ctx, cloudArr, imageArr, cloudLink, roughAmount, canvasW, canvasH) {
  for (let i = 0; i < roughAmount; i++) {
    let [x, y] = [canvasW + Math.round(Math.random() * (canvasW - 91)), Math.round(Math.random() * (canvasH - 40 - 20))];

    if (i > 0) {
      let collided = [];
      for (let h = 0; h < cloudArr.length; h++) {
        let cloud = cloudArr[h];
        collided[h] = collision(cloud, {x: x, y: y, width: 91, height: 40}, 'touch');
      }
      if (collided.every(v => v === false)) {
        cloudArr.push(new Cloud(x, y, 91, 40, Math.round(Math.random() * 4 + 2),
          imageArr[cloudLink], ctx));
      }

    } else {
      cloudArr.push(new Cloud(x, y, 91, 40, Math.random() / 2,
        imageArr[cloudLink], ctx));
    }
  }
}

class Sky extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
    };
    this.canvasRef = React.createRef();
  }

  animation = () => {
    this.animationId = window.requestAnimationFrame(this.animation);

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.clouds.length; i++) {
      let cloud = this.clouds[i];

      if (cloud.x + cloud.width < 0) {
        cloud.x += this.state.width + cloud.width;
        cloud.y = 10 + Math.round(Math.random() * (this.state.height - 40 - 20));
        // console.log(this.state.width + ' ' + cloud.width + ' ' + cloud.x);
      }

      cloud.draw();
    }
  };

  componentDidMount = () => {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');
    this.sky = document.getElementsByClassName('sky')[0];

    this.setState({width: this.sky.clientWidth, height: this.sky.clientHeight});

    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        this.setState({width: this.sky.clientWidth, height: this.sky.clientHeight});
      }, 50);
    });
    window.addEventListener("update", () => {
      setTimeout(() => {
        let idealCloudAmount = Math.round(this.sky.clientWidth * this.sky.clientHeight / 32000/3);
        let difference = this.clouds.length - idealCloudAmount;
        if (difference > 0 && difference !== this.clouds.length){
          for (let i = 0; i < difference; i++){
            if (this.clouds.length > 5){
              this.clouds.pop();
            }
          }
        }
        this.setState({width: this.sky.clientWidth, height: this.sky.clientHeight});
      }, 50);
    });

    this.cloudLink = 'https://images.koji-cdn.com/af987799-0da1-4c15-9387-40eef2d6189e/uu8ha-cloud.png';
    let images = [this.cloudLink];
    this.loadedImages = {};
    let promiseArray = images.map((imgurl) => {
      let prom = new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => {
          this.loadedImages[imgurl] = img;
          resolve();
        };
        img.src = imgurl;
      });
      return prom;
    });

    Promise.all(promiseArray).then(() => {
      this.clouds = [];
      generateClouds(this.ctx, this.clouds, this.loadedImages, this.cloudLink,
        this.sky.clientWidth * this.sky.clientHeight / 32000, this.state.width, this.state.height);
      this.cloudAmount = this.clouds.length;

      this.width = this.state.width;
      this.height = this.state.height;

      this.animation();
    });

  };

  render() {
    return (
      <div className='sky'>
        <canvas ref={this.canvasRef} id='box' width={this.state.width} height={this.state.height}/>
      </div>
    );
  }
}

export default Sky;
