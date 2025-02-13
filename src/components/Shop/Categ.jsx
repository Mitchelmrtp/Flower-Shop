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
            <img src={`http://127.0.0.1:3001${subcat.image}`} alt={subcat.name} className="w-8 h-8 inline-block mr-2" />
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