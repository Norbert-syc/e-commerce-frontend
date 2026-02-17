import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

interface DecodedToken {
  role?: string;
  exp?: number;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  
  try {
    const decoded: DecodedToken = jwtDecode(token);
    
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return <Navigate to="/admin/login" replace />;
    }
    
    if (decoded.role !== 'admin') {
      return <Navigate to="/admin/login" replace />;
    }
  } catch (error) {
    localStorage.removeItem('token');
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
