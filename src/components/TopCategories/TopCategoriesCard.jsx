import React from "react";
import topCategoriesdata from "./topCategoriesData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./topcategoriescard.css";

const TopCategoriesCard = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 3, dots: true } },
      { breakpoint: 1024, settings: { slidesToShow: 2, dots: true } },
      { breakpoint: 768, settings: { slidesToShow: 1, dots: true } },
      { breakpoint: 576, settings: { slidesToShow: 1, dots: true } },
    ],
  };

  return (
    <Slider {...settings}>
      {topCategoriesdata.map((value, index) => (
        <div className="box-cate product-top" key={index}>
          <div className="nametop d_flex">
            <span className="tLeft">{value.para}</span>
            <span className="tRight">{value.desc}</span>
          </div>
          <div className="img img-cate">
            <img src={value.cover} alt={value.para} />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default TopCategoriesCard;
