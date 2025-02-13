import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Shopcart = ({ shopItems, addToCart }) => {
  const [likes, setLikes] = useState({});
  const navigate = useNavigate();

  const handleLike = (productId) => {
    setLikes(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      {shopItems.map((product) => (
        <div 
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" 
          key={product.id}
          onClick={() => handleProductClick(product.id)}
        >
          <div className="p-4">
            <div className="relative mb-4 group">
              {product.discount > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                  {product.discount}% Off
                </span>
              )}
              <Link to={`/product/${product.id}`} className="block">
                <img 
                  src={`http://127.0.0.1:3001${product.image}`}
                  alt={product.name}
                  className="w-full h-auto min-h-[200px] max-h-[280px] object-contain mx-auto transition-transform duration-300 group-hover:scale-105" 
                />
              </Link>
            </div>
            <div className="space-y-3">
              <Link 
                to={`/product/${product.id}`}
                className="block hover:text-blue-600 transition-colors"
              >
                <h3 className="font-medium text-gray-800 line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, index) => (
                  <i key={index} className="fa fa-star text-sm"></i>
                ))}
              </div>
              <div className="flex justify-between items-center pt-2">
                <h4 className="text-lg font-semibold">S/ {product.price}</h4>
              </div>
              <div className="flex justify-center">
                <button 
                  onClick={() => addToCart(product)}
                  className="px-6 py-2 md:px-20 md:py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-full text-lg hover:from-pink-600 hover:to-yellow-600 shadow-lg transform hover:scale-105 transition-transform duration-300"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Shopcart;