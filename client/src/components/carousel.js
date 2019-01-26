import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const items = [
  {
    src:
      "https://scontent-iad3-1.xx.fbcdn.net/v/t1.15752-9/49035861_380778646064239_2538011705531695104_n.jpg?_nc_cat=104&_nc_ht=scontent-iad3-1.xx&oh=ab2626df4133c17a01f46f8faa907d31&oe=5CC06F59"
  },
  {
    src:
      "https://cdn-img.health.com/sites/default/files/styles/medium_16_9/public/migration/img/web/2015/07/dog-workout-opener-400x400.jpg?itok=kAnl65Nb"
  },
  {
    src:
      "https://images.wagwalkingweb.com/media/articles/dog/fatigue-and-exercise/fatigue-and-exercise.jpg"
  },
  {
    src:
      "https://media1.fdncms.com/chicago/imager/bow-wow/u/slideshow/6099965/1334905000-shutterstock_77744503.jpg"
  },
  {
    src:
      "https://static1.squarespace.com/static/577282aa8419c230c8691c78/t/57b1fb6dbebafb1f2e1448f9/1471282037105/"
  }
];

class MyCarousel extends Component {
  render() {
    return <Carousel autoPlay={true} infiniteLoop={true} interval={3500} transitionTime={1000}>
        <div>
          <img src={items[0].src} />
        </div>
        <div>
          <img src={items[1].src} />
        </div>
        <div>
          <img src={items[2].src} />
        </div>
        <div>
          <img src={items[3].src} />
        </div>
        <div>
          <img src={items[4].src} />
        </div>
      </Carousel>;
  }
}

export default MyCarousel;
