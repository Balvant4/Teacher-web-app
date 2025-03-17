import AdminDashboard from "../../views/admin/AdminDashboard";

const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
];

export default adminRoutes;
