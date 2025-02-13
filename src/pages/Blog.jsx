
// Contenido de: Allproducts.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Shopcart from "../Shop/Shopcart";
import Categ from "../Shop/Categ";
import { productAPI } from "../../utils/api";

const ITEMS_PER_PAGE = 16; // 4 filas de 4 productos

const AllProducts = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleFilterChange = async (subcategoryId) => {
    try {
      const filtered = await productAPI.getProductsBySubcategory(subcategoryId);
      setFilteredProducts(filtered);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productAPI.getAllProducts();
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

  const handleCategorySelect = async (categoryId, cateName, products) => {
    setProducts(products); // Update the products state with filtered products
  };

  const displayedProducts = filteredProducts.length > 0 ? filteredProducts : currentItems;

  return (
    <section className="bg-[#f6f9fc] min-h-screen py-8">
      <div className="mx-auto px-0 md:px-4 max-w-8xl">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4 w-full">
          <Categ 
              onCategorySelect={handleCategorySelect} 
              mode={location.pathname === "/all-products" ? "all" : "offers"} 
            />
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-semibold">Eventos</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              <Shopcart shopItems={currentItems} addToCart={addToCart} />
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 gap-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                  disabled={currentPage === 0}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded disabled:opacity-50 hover:from-pink-600 hover:to-yellow-600 transition-colors"
                >
                  Anterior
                </button>
                <span className="px-4 py-2">
                  Página {currentPage + 1} de {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                  disabled={currentPage === totalPages - 1}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded disabled:opacity-50 hover:from-pink-600 hover:to-yellow-600 transition-colors"
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;


// Contenido de: ProductLayout.jsx
import React from 'react';

const ProductLayout = ({ title, showViewAll = false, onViewAll, children, sidebar }) => {
  return (
    <section className="bg-[#f6f9fc] min-h-screen py-8">
      <div className="mx-auto px-0 md:px-4 max-w-8xl">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4 w-full">
            {sidebar}
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
              {showViewAll && (
                <div 
                  onClick={onViewAll} 
                  className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"
                >
                  <span className="mr-2 text-sm md:text-base">Ver Todo</span>
                  <i className="fa fa-caret-right"></i>
                </div>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductLayout;


// Contenido de: Shopcart.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Shopcart = ({ shopItems, addToCart }) => {
  const [likes, setLikes] = useState({});

  const handleLike = (productId) => {
    setLikes(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  return (
    <>
      {shopItems.map((product) => (
        <div 
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" 
          key={product.id}
        >
          <div className="p-4">
            <div className="relative mb-4 group">
              {product.discount > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                  {product.discount}% Off
                </span>
              )}
              <Link to={`/all-products/${product.id}`} className="block">
                <img 
                  src={`http://127.0.0.1:3001${product.image}`}
                  alt={product.name}
                  className="w-full h-auto min-h-[200px] max-h-[280px] object-contain mx-auto transition-transform duration-300 group-hover:scale-105" 
                />
              </Link>
            </div>
            <div className="space-y-3">
              <Link 
                to={`/all-products/${product.id}`}
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


// Contenido de: Categ.jsx
import React, { useState, useEffect } from "react";
import { categoryAPI, productAPI } from "../../utils/api";

const Categ = ({ pageType = "eventos", onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState("categorias");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryAPI.getAllCategories();
        let targetCategory;
        
        switch(pageType) {
          case "ofertas":
            // Mostrar todas las subcategorías
            const allSubcats = [];
            for (const cat of data) {
              const subCats = await categoryAPI.getSubcategoriesByCategory(cat.id);
              allSubcats.push(...subCats);
            }
            setSubcategories(allSubcats);
            break;
          
          case "eventos":
            targetCategory = data.find(cat => cat.name === "Eventos");
            if (targetCategory) {
              const subCats = await categoryAPI.getSubcategoriesByCategory(targetCategory.id);
              setSubcategories(subCats);
            }
            break;
          
          case "ocasiones":
            targetCategory = data.find(cat => cat.name === "Ocasiones");
            if (targetCategory) {
              const subCats = await categoryAPI.getSubcategoriesByCategory(targetCategory.id);
              setSubcategories(subCats);
            }
            break;
          
          case "ramos":
            targetCategory = data.find(cat => cat.name === "Ramos");
            if (targetCategory) {
              const subCats = await categoryAPI.getSubcategoriesByCategory(targetCategory.id);
              setSubcategories(subCats);
            }
            break;
        }
        
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [pageType]);

  const handleSubcategoryClick = async (subcategoryId) => {
    try {
      setActiveSubcategory(subcategoryId);
      const filteredProducts = await productAPI.getProductsBySubcategory(subcategoryId);
      onFilterChange(filteredProducts);
    } catch (err) {
      console.error("Error filtering products:", err);
    }
  };

  const displayedSubcategories = showAll ? 
    subcategories : 
    subcategories.slice(0, 10);

  if (loading) return <div>Cargando categorías...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      {pageType === "ofertas" && (
        <div className="flex gap-6 mb-6 border-b border-gray-100 pb-4">
          <button
            className={`text-lg font-semibold ${
              activeTab === "categorias" ? "text-blue-600" : "text-gray-400"
            } relative pb-4 ${
              activeTab === "categorias" ? 
              "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600" : ""
            }`}
            onClick={() => setActiveTab("categorias")}
          >
            Categorías
          </button>
          <button
            className={`text-lg font-semibold ${
              activeTab === "ocasiones" ? "text-blue-600" : "text-gray-400"
            } relative pb-4 ${
              activeTab === "ocasiones" ? 
              "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600" : ""
            }`}
            onClick={() => setActiveTab("ocasiones")}
          >
            Ocasiones
          </button>
        </div>
      )}
      
      <div className="space-y-4">
        {displayedSubcategories.map((subcat) => (
          <button
            key={subcat.id}
            onClick={() => handleSubcategoryClick(subcat.id)}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors ${
              activeSubcategory === subcat.id ? 'bg-gray-100' : ''
            }`}
          >
            <span className="text-gray-700">{subcat.name}</span>
          </button>
        ))}
        
        {pageType === "ofertas" && subcategories.length > 10 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full text-center py-2 text-blue-600 hover:text-blue-700"
          >
            {showAll ? "Mostrar menos" : "Mostrar más"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Categ;


// Contenido de: Shop.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Categ from "./Categ";
import Shopcart from "./Shopcart";
import ProductLayout from "../Layout/ProductLayout";
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
        const data = await productAPI.getProductsByCategory(1);
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


// Contenido de: api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3001';

export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  getProfile: async (token) => {
    const response = await fetch(`${API_URL}/api/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },


};

export const productAPI = {
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_URL}/product`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      throw new Error('Error fetching products: ' + error.message);
    }
  },
  
  getProductsByCategory: async (categoryId) => {
    try {
      const response = await fetch(`${API_URL}/product?category_id=${categoryId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      throw new Error('Error fetching products by category: ' + error.message);
    }
  },

  getProductsByCategoryAndSubcategory: async (categoryId, subcategoryId) => {
    try {
      const response = await fetch(`${API_URL}/product?category_id=${categoryId}&subcategory_id=${subcategoryId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error fetching filtered products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getProductsByCategoryAndSubcategory:', error);
      throw error;
    }
  },

  getProductsBySubcategory: async (subcategoryId) => {
    try {
      const response = await fetch(`${API_URL}/product/subcategory/${subcategoryId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      throw new Error('Error fetching products by subcategory: ' + error.message);
    }
  },

};

export const categoryAPI = {
  getAllCategories: async () => {
    try {
      const response = await fetch(`${API_URL}/category`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      throw new Error('Error fetching categories: ' + error.message);
    }
  },
  
  getSubcategoriesByCategory: async (categoryId) => {
    try {
      const response = await fetch(`${API_URL}/subcategory/category/${categoryId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      throw new Error('Error fetching subcategories: ' + error.message);
    }
  }
};


// Contenido de: app.js
import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import category from './src/routes/categoryRoutes.js';
import product from './src/routes/productRoutes.js';
import subCategory from './src/routes/subCategoryRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public/uploads"
app.use('/uploads', express.static('public/uploads'));

app.get('/', (req, res) => {
    return res.json({ result: 'OK' });
});

app.use('/api', authRoutes);
app.use('/category', category);
app.use('/product', product);
app.use('/subcategory', subCategory);

export default app;



// Contenido de: productController.js
import { Product } from '../models/index.js';

export const findAll = async (req, res) => {
    try {
        const { category_id, subcategory_id } = req.query;
        let whereClause = {};
        
        if (category_id) {
            whereClause.category_id = category_id;
        }
        
        if (subcategory_id) {
            whereClause.subcategory_id = subcategory_id;
        }
        
        const products = await Product.findAll({
            where: whereClause,
            include: ['category', 'subcategory']
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const findById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: ['category', 'subcategory']
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.update(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const remove = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.destroy();
        res.status(200).json({ message: 'Product successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export default {
    findAll,
    findById,
    create,
    update,
    remove
};


// Contenido de: subcategoryController.js
import { SubCategory } from '../models/index.js';

export const findAll = async (req, res) => {
    try {
        const subcategories = await SubCategory.findAll({
            include: ['category']
        });
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const findById = async (req, res) => {
    try {
        const subcategory = await SubCategory.findByPk(req.params.id, {
            include: ['category']
        });
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        res.status(200).json(subcategory);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const findByCategory = async (req, res) => {
    try {
        const subcategories = await SubCategory.findAll({
            where: {
                category_id: req.params.categoryId
            },
            include: ['category']
        });
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const subcategory = await SubCategory.create(req.body);
        res.status(201).json(subcategory);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const subcategory = await SubCategory.findByPk(req.params.id);
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        await subcategory.update(req.body);
        res.status(200).json(subcategory);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const remove = async (req, res) => {
    try {
        const subcategory = await SubCategory.findByPk(req.params.id);
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        await subcategory.destroy();
        res.status(200).json({ message: 'Subcategory successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export default {
    findAll,
    findById,
    findByCategory,
    create,
    update,
    remove
};


// Contenido de: categoryController.js
import { Category } from '../models/index.js';

export const findAll = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: ['subcategory']
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const findById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id, {
            include: ['subcategory']
        });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        await category.update(req.body);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const remove = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        await category.destroy();
        res.status(200).json({ message: 'Category successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export default {
    findAll,
    findById,
    create,
    update,
    remove
};


// Contenido de: Product.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    category_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    subcategory_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    tableName: 'product',
    timestamps: false
});

export default Product;


// Contenido de: SubCategory.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SubCategory = sequelize.define('SubCategory', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    category_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    tableName: 'subcategory',
    timestamps: false
});

export default SubCategory;


// Contenido de: Category.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'category',
    timestamps: false
});

export default Category;

