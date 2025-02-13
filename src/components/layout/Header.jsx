import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaHeart, FaShoppingCart, FaSearch, FaBars } from "react-icons/fa";
import categoryData from "../Category/categoryData";
import AnimatedBanner from "./BannerAnimated";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleOcasionesClick = () => {
    setSubmenuOpen(!submenuOpen); // Alterna el submenú
    setTimeout(() => {
      navigate("/ocasiones"); // Redirige después de un pequeño tiempo
    }, 200); // Pequeño retraso para evitar conflictos de eventos
  };

  return (
    <>
      {/* 🔹 Header Principal */}
      <header className="bg-[#f3e8ef] shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          {/* 🔹 Buscador en la parte superior */}
          <div className="flex justify-center py-3">
            <div className="relative w-full md:w-1/2 flex">
              <input
                type="search"
                placeholder="Ramo de Flores amarillas"
                className="w-full px-6 py-2 pl-10 text-gray-700 border rounded-full bg-white shadow-md text-lg"
              />
              <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FaSearch size={18} />
              </button>
            </div>
          </div>

          {/* 🔹 Contenedor principal con menú, logo e iconos mb-2 margen banner*/}
          <div className="flex items-center justify-between mb-2">
            {/* Menú Hamburguesa (A la Izquierda) */}
                  <button
                    className="md:hidden text-gray-700 mr-3"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <FaBars size={24} />
                  </button>

                  {/* Logotipo */}
                  <Link to="/" className="flex items-center justify-center md:justify-start w-full md:w-auto">
                    <div className="w-[114px] flex justify-center md:justify-end">
                    <img 
                      src="/assets/images/logoFP.PNG" 
                      alt="Logo" 
                      className="h-12 w-auto max-w-[150px] sm:h-14 md:h-16 lg:h-20 object-contain"
                    />
                    </div>
                  </Link>

                  {/* Menú de Navegación (Solo en Escritorio) */}
            <nav className="hidden md:flex flex-1 justify-center space-x-11 text-xl font-semibold">
              <Link to="/ofertas" className="text-gray-700 hover:text-gray-900">Ofertas</Link>
              <div 
                className="relative"
                onMouseEnter={() => setSubmenuOpen(true)}
                onMouseLeave={() => setSubmenuOpen(false)}
              >
                <button
                  className="text-gray-700 hover:text-gray-900"
                  onClick={handleOcasionesClick}
                >
                  Ocasiones
                </button>
                {submenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 border">
                    {categoryData.map((category, index) => (
                      <Link
                        key={index}
                        to={`/ocasiones/${category.categoryName.toLowerCase()}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-normal"
                      >
                        {category.categoryName}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/eventos" className="text-gray-700 hover:text-gray-900">Eventos</Link>
              <Link to="/ramos" className="text-gray-700 hover:text-gray-900">Ramos</Link>
              <Link to="/blog" className="text-gray-700 hover:text-gray-900">Blog</Link>
              <Link to="/nosotros" className="text-gray-700 hover:text-gray-900">Nosotros</Link>
            </nav>

            {/* Iconos de Usuario, Favoritos y Carrito */}
            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                <FaUser size={22} />
              </Link>
              <Link to="/favoritos" className="text-gray-600 hover:text-gray-900">
                <FaHeart size={22} />
              </Link>
              <Link to="/cart" className="text-gray-600 hover:text-gray-900">
                <FaShoppingCart size={22} />
              </Link>
            </div>
          </div>

          {/* Menú desplegable en móviles */}
          {menuOpen && (
            <nav className="md:hidden flex flex-col space-y-2 text-center py-2 text-xl font-semibold">
              <Link to="/ofertas" className="text-gray-700 hover:text-gray-900">Ofertas</Link>
              <button
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setSubmenuOpen(!submenuOpen)}
              >
                Ocasiones
              </button>
              {submenuOpen && (
                <div className="flex flex-col bg-white shadow-md rounded-md">
                  {categoryData.map((category, index) => (
                    <Link
                      key={index}
                      to={`/ocasiones/${category.categoryName.toLowerCase()}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {category.categoryName}
                    </Link>
                  ))}
                </div>
              )}
              <Link to="/eventos" className="text-gray-700 hover:text-gray-900">Eventos</Link>
              <Link to="/ramos" className="text-gray-700 hover:text-gray-900">Ramos</Link>
              <Link to="/blog" className="text-gray-700 hover:text-gray-900">Blog</Link>
              <Link to="/nosotros" className="text-gray-700 hover:text-gray-900">Nosotros</Link>
            </nav>
          )}
        </div>
      </header>

      {/* 🔹 Banner de Envíos */}
      <AnimatedBanner />
    </>
  );
}
