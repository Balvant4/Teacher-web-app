import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRole }) => {
  const { role, isAuthenticated } = useSelector((state) => state.adminAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== allowedRole || !isAuthenticated) {
      navigate("/", { replace: true }); // ✅ This updates the URL
    }
  }, [role, isAuthenticated, allowedRole, navigate]);

  return isAuthenticated && role === allowedRole ? element : null;
};

export default ProtectedRoute;
