import InputForm from "../../components/InputForm";
import MainButton from "../../components/MainButton";
import { MdEmail, MdLock } from "react-icons/md";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../store/Reducers/adminAuthReducers";
import { toast } from "react-hot-toast";

const AdminLogin = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successMessage, role } = useSelector(
    (state) => state.adminAuth
  );

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (role === "admin") {
      navigate("/admin/dashboard"); // ✅ Redirect only when role is set
    }
  }, [role, navigate]);

  const inputHandle = useCallback((e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(state));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (successMessage) {
      toast.success(successMessage);
      navigate("/admin/dashboard"); // ✅ Navigate immediately
    }
  }, [error, successMessage, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ffffff]">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center">
          <img className="w-[20rem] mb-4" src="" alt="Admin Logo" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Admin Login
        </h2>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <InputForm
            name="email"
            type="email"
            placeholder="Admin Email"
            icon={MdEmail}
            value={state.email}
            onChange={inputHandle}
          />
          <InputForm
            name="password"
            type="password"
            placeholder="Admin Password"
            icon={MdLock}
            value={state.password}
            onChange={inputHandle}
          />
          <MainButton
            text={loading ? "Logging in..." : "Login"}
            className="my-4 w-full bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-semibold py-3 transition duration-300 ease-in-out transform hover:scale-105"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
