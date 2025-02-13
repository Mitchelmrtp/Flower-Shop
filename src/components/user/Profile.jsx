import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../utils/api';

function Profile() {
  const { token, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await authAPI.getProfile(token);
        setUserData(data);
      } catch (error) {
        console.error('Error:', error);
        logout();
        navigate('/login');
      }
    };

    fetchUserData();
  }, [token, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">Perfil de Usuario</h2>
        <div className="space-y-4">
          <p><strong>Nombre:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Cuenta creada:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Profile;