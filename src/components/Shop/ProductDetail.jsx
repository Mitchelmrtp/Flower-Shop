import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productAPI } from "../../utils/api";
import Shopcart from "../Shop/Shopcart";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productAPI.getProductById(productId);
        setProduct(data);
        setSelectedImage(`http://127.0.0.1:3001${data.image}`);
        setLoading(false);

        const similarData = await productAPI.getProductsByCategory(data.category_id);
        setSimilarProducts(similarData.filter(p => p.id !== data.id));
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div className="text-center py-8">Cargando producto...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  const images = [`http://127.0.0.1:3001${product.image}`];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Image Gallery */}
        <div className="w-full md:w-1/2">
          <div className="w-4/5 bg-gray-50 rounded-lg p-4">
            <img 
              src={selectedImage} 
              alt="Product"
              className="w-full h-72 object-contain" // Más pequeño
            />
          </div>
          <div className="flex gap-4 mt-4 overflow-x-auto">
            {images.map((img, index) => (
              <div 
                key={index}
                className={`w-20 h-20 bg-gray-50 rounded-lg cursor-pointer flex-shrink-0 
                  ${selectedImage === img ? 'border-2 border-blue-500' : ''}`}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
          <p className="text-xl font-bold mb-6">S/ {product.price}</p>
          
          <div className="mb-6">
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">Stock: {product.stock}</p>
            {product.discount > 0 && (
              <p className="text-red-500">Descuento: {product.discount}%</p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Cantidad:</h3>
            <div className="flex gap-2">
              <button
                className="w-8 h-8 rounded border border-gray-300"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="w-8 h-8 flex items-center justify-center border border-gray-300">
                {quantity}
              </span>
              <button
                className="w-8 h-8 rounded border border-gray-300"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="px-4 py-3 bg-custom-btn  text-white rounded-md w-full">
              Comprar
            </button>
            <button className="px-4 py-3 bg-custom-btn text-white rounded-md w-full">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-6">Productos similares</h3>
        <Slider {...sliderSettings} className="mt-6">
          {similarProducts.map((product) => (
            <div key={product.id} className="px-2">
              <Shopcart shopItems={[product]} className="h-auto object-contain" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductDetail;
