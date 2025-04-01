import InputForm from "../../components/InputForm";
import MainButton from "../../components/MainButton";
import { MdEmail, MdLock } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { teacherLogin } from "../../store/Reducers/teacherAuthReducers";
import toast from "react-hot-toast";

const TeacherLogin = () => {
  // State initialization
  const [state, setState] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get values from Redux
  const { loading, error, successMessage } = useSelector(
    (state) => state.teacherAuth
  );

  // Handle input changes
  const inputHandle = useCallback((e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Form submit handler
  const submit = (e) => {
    e.preventDefault();
    dispatch(teacherLogin(state));
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        toast.error(error);
      }, [1000]);
    }
    if (successMessage) {
      setTimeout(() => {
        toast.success(successMessage);
      }, [1000]);
      // Navigate after a short delay to ensure the user sees the toast
      setTimeout(() => {
        navigate("/teacher/dashboard");
      }, 1000); // 1-second delay
    }
  }, [error, successMessage, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#101426] text-white">
      <div className="w-full max-w-lg p-8 bg-[#222b45] rounded-xl shadow-lg">
        {/* Logo */}
        <div className="flex justify-center">
          <img className="w-[20rem] mb-4" src="" alt=" Logo" />
        </div>
        <h2 className="text-3xl font-bold text-center ">Teacher Login</h2>
        <form onSubmit={submit} className="mt-8 space-y-4">
          {/* Reusable Input Components */}
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
          {/* Submit Button */}
          <MainButton
            text={loading ? "Logging in..." : "Login"}
            disabled={loading}
            className={`my-4 w-full bg-[#ff7700] hover:bg-[#a74e00] rounded-xl text-white font-semibold py-3 transition duration-300 ease-in-out transform hover:scale-105 ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          />
        </form>
      </div>
    </div>
  );
};

export default TeacherLogin;
