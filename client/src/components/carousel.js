import React, { Component } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

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
  }
];

class CarouselPics extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} height="350px" max-width="100%" />
          <CarouselCaption
            captionText={item.caption}
            captionHeader={item.caption}
          />
        </CarouselItem>
      );
    });

    return (
        <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous} interval="2500">
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
    );
  }
}

export default CarouselPics;
