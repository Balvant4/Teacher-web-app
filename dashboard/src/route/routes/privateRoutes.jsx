import ProtectedRoute from "../routes/protectRoute";
import AdminDashboard from "../../views/admin/AdminDashboard";
import TeacherDashboard from "../../views/teacher/TeacherDashboard";
import PaymentRequest from "../../views/admin/PaymentRequest";

const privateRoutes = [
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute element={<AdminDashboard />} allowedRole="admin" />
    ),
  },
  {
    path: "/admin/payment-request",
    element: (
      <ProtectedRoute element={<PaymentRequest />} allowedRole="admin" />
    ),
  },
  {
    path: "/teacher/dashboard",
    element: (
      <ProtectedRoute element={<TeacherDashboard />} allowedRole="teacher" />
    ),
  },
];

export default privateRoutes;
