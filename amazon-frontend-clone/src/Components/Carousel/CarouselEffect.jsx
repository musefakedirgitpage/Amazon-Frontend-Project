import {Carousel} from "react-responsive-carousel"
import {img} from "./images/data"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./carousel.module.css"

const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}>
        {img.map((imagelink) => {
          return <img src={imagelink} />;
        })}
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  );
};

export default CarouselEffect;
