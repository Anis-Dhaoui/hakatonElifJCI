import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src: 'assets/videos/vid01.mp4'
  }
];

const SlideShow = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <video style={{ height: 360, width: '150%' }} width="100%" controls="false" autoPlay loading="lazy" muted loop>
          <source src={item.src} type="video/mp4"></source>
          Sorry, your browser doesn't support videos.
        </video>
        {/* <div className="carousel-overlay"></div> */}
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} style={{ display: "block" }} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      id="top-header-carousel"
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      {slides}
    </Carousel>
  );
}

export default SlideShow;