import TeacherDashboard from "../../views/teacher/TeacherDashboard";

const teacherRoutes = [
  {
    path: "/teacher/dashboard",
    element: <TeacherDashboard />,
    role: "teacher",
  },
];

export default teacherRoutes;
