import { AiOutlineDashboard } from "react-icons/ai";

const allPrivateRoute = [
  {
    id: 1,
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 1,
    title: "Payment Request",
    icon: <AiOutlineDashboard />,
    role: "admin",
    path: "/admin/payment-request",
  },
  {
    id: 1,
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: "teacher",
    path: "/teacher/dashboard",
  },
];

export default allPrivateRoute;
