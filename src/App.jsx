// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import Nosotros from './pages/Nosotros';
import Eventos from './pages/Eventos';
import Ofertas from './pages/Ofertas';
import Ocasiones from './pages/Ocasiones';
import Ramos from './pages/Ramos';
import ProductDetail from './components/Shop/ProductDetail';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth();
  
  if (loading) {
    return <div>Cargando...</div>;
  }
  
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-custom-bg"> {/* Aplica el color de fondo */}
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/eventos" element={<Eventos />} />
              <Route path="/ofertas" element={<Ofertas />} />
              <Route path="/ocasiones" element={<Ocasiones />} />
              <Route path="/ramos" element={<Ramos />} />
              <Route path="/product/:productId" element={<ProductDetail />} />

              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;