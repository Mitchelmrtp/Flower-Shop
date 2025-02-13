import React from 'react';
import Cart from '../../components/Cart/Cart';

const Cartpage = ({ productItems, cartItems, addToCart, deleteFromCart, shopItems, checkOut ,removeFromCart }) => {
  // Cartpage consists of different smaller components I made so we can reuse them later when needed and sending different components necessary props to use them in there
  return (
    <>
      <Cart cartItems={cartItems} addToCart={addToCart} deleteFromCart={deleteFromCart} shopItems={shopItems} checkOut={checkOut} removeFromCart ={removeFromCart} />
    </>
  )
}

export default Cartpage;