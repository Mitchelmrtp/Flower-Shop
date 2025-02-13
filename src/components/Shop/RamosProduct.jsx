import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Shopcart from "./Shopcart";
import Categ from "./Categ";
import Pagination from "../common/Pagination";
import { productAPI } from "../../utils/api";
import { ITEMS_PER_PAGE } from "../../utils/constants";

const ProductEvent = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleFilterChange = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productAPI.getProductsByCategory(4); // Assuming category ID 2 is for "Eventos"
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  if (loading) return <div className="text-center py-8">Cargando productos...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const currentItems = products.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const displayedProducts = filteredProducts.length > 0 ? filteredProducts : currentItems;

  return (
    <section className="bg-[#f6f9fc] min-h-screen py-8">
      <div className="mx-auto px-0 md:px-4 max-w-8xl">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4 w-full">
            <Categ 
              pageType="ramos"
              onFilterChange={handleFilterChange} 
            />
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-semibold">Ramos</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              <Shopcart shopItems={displayedProducts} addToCart={addToCart} />
            </div>
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                setCurrentPage={setCurrentPage} 
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductEvent;