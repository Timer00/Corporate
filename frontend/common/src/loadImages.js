function loadImages(images) {
  return new Promise((resolve)=>{

    let totalImgN = 0;
    for (let i = 0; i < images.length; i++) {
      totalImgN += images[i].number;
    }

    function run() {
      if (imageLoading === totalImgN) {
        resolve(allImages);
      }
    }

    let allImages = {};
    let imageLoading = 0;
    for (let i = 0; i < images.length; i++) {
      let imagez = images[i];
      if (imagez.animation) {
        let currentImage = allImages[imagez.name] = [];
        for (let l = 0; l < imagez.number; l++) {
          currentImage.push(new Image());
          currentImage[l].onload = function () {
            imageLoading++;
            run();
          };
          currentImage[l].src = imagez.src + l + imagez.format;
        }
      } else {
        let currentImage = allImages[imagez.name] = new Image();
        currentImage.src = imagez.src;
        currentImage.onload = ()=> {
          imageLoading++;
          run();
        };
      }
    }
  });
}

export default loadImages;

//Example of usage:
/*
loadImages([
    {name: 'player',src: 'imagens/player/player', format: '.png', number: 95, animation: true},
    {name: 'floor',src: 'imagens/floor.png',number: 1,animation: false}
],loadCode,imageArray);

imageArray['floor'];
*/
