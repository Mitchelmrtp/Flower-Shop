import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth();
  
  if (loading) {
    return <div>Cargando...</div>;
  }
  
  return token ? children : <Navigate to="/login" />;
};

// Nuevo componente PublicRoute
const PublicRoute = ({ children }) => {
  const { token, loading } = useAuth();
  
  if (loading) {
    return <div>Cargando...</div>;
  }
  
  return !token ? children : <Navigate to="/profile" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to="/login" />} 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;