import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Categ from "../Shop/Categ";
import Shopcart from "../Shop/Shopcart";
import ProductLayout from "../layout/ProductLayout";
import { productAPI } from "../../utils/api";

const Shop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productAPI.getProductsByCategory(1); // Assuming category ID 1 is for "Ofertas"
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (products) => {
    setFilteredProducts(products);
    setCurrentPage(0); // Reset to the first page when filtering
  };

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  const displayedProducts = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <ProductLayout
      title="Ofertas"
      showViewAll={true}
      onViewAll={() => navigate("/all-products")}
      sidebar={
        <Categ 
          pageType="ofertas" 
          onFilterChange={handleFilterChange}
          showTabs={true}
          maxDisplay={10}
        />
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        <Shopcart shopItems={displayedProducts} />
      </div>
    </ProductLayout>
  );
};

export default Shop;