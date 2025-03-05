import AdminLogin from "../views/auth/AdminLogin";
import TeacherLogin from "../views/auth/TeacherLogin";
import TeacherSignup from "../views/auth/TeacherSignup";

const authRoute = [
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/teacher/login",
    element: <TeacherLogin />,
  },
  {
    path: "/teacher/signup",
    element: <TeacherSignup />,
  },
];

export default authRoute;
