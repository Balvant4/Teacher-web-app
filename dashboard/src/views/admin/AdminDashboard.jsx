import React from "react";
import MainButton from "../../components/MainButton";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
  return (
    <div>
      <Link to="/teacher/login">
        <MainButton text="TeacherLogin" />
      </Link>

      <Link to="/teacher/signup">
        <MainButton text="TeacherRegister" />
      </Link>

      <Link to="/admin/login">
        <MainButton text="AdminLogin" />
      </Link>
    </div>
  );
};

export default AdminDashboard;
