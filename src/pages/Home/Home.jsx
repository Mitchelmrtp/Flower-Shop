import React, { useState } from 'react';
import Hero from '../../components/home/Hero';
import Categories from '../../components/home/Categories';
import TopCategories from '../../components/TopCategories/TopCategories';
import Shop from '../../components/Shop/Shop';

const Homepage = ({ productItems, addToCart, cartItems, shopItems }) => {


  return (
    <div>
      <Hero />
      <TopCategories />
      <Shop shopItems={shopItems} addToCart={addToCart} />
    </div>
  );
}

export default Homepage;
