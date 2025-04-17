// src/components/UserCarouselRestaurant.tsx
import React from 'react';
import Slider from 'react-slick';
import './UserCarouselRestaurant.css'; // se quiser customizar com CSS

const restaurants = [
  {
    name: 'Biskaia',
    image: '/images/restaurant1.jpg',
    rating: 1,
  },
  {
    name: 'Gelson Lanches',
    image: '/images/restaurant2.jpg',
    rating: 3,
  },
  {
    name: 'Bistrot',
    image: '/images/restaurant3.jpg',
    rating: 3,
  },
];

const UserCarouselRestaurant: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {restaurants.map((restaurant, index) => (
          <div className="carousel-card" key={index}>
            <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
            <h3>{restaurant.name}</h3>
            <p>{'★'.repeat(restaurant.rating)}{'☆'.repeat(5 - restaurant.rating)}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default UserCarouselRestaurant;