import React, { useState } from "react";
import { InputForm, MainButton } from "../../components/index.js";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loginVariant = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.4 } },
};

const contentVariant = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.8 } },
};

const AdminLogin = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.warn("All fields are required!");
      return;
    }

    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      toast.success("Login Successful!");
      console.log("Final Submitted Data:", data);
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('../../public/admin_background.jpg')] bg-cover bg-center min-w-screen relative">
      {/* Background Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-black/40"></div>

      <motion.div
        className="rounded-3xl shadow-2xl w-full max-w-5xl flex overflow-hidden h-auto relative z-10 bg-white/10 backdrop-blur-lg border border-white/20"
        variants={loginVariant}
        initial="hidden"
        animate="visible"
      >
        {/* Image Section */}
        <div className="w-5/12 hidden md:flex items-center justify-center h-full">
          <motion.img
            className="w-full h-full object-cover shadow-lg rounded-l-3xl"
            variants={loginVariant}
            initial="hidden"
            animate="visible"
            src="../../../public/office-bearers-vector.jpg"
            alt="Admin Login"
          />
        </div>

        {/* Form Section */}
        <div className="w-7/12 flex flex-col justify-center p-8">
          <motion.h2
            className="text-2xl font-bold text-center text-white mb-8"
            variants={contentVariant}
          >
            Admin Login
          </motion.h2>

          <motion.form onSubmit={onSubmit} className="space-y-6" variants={contentVariant}>
            <InputForm
              type="email"
              name="email"
              value={data.email}
              onChange={onChange}
              loader={loader}
              placeholder="Enter your email"
              className="w-full border border-gray-300 bg-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition hover:shadow-md"
            />
            <InputForm
              type="password"
              name="password"
              value={data.password}
              onChange={onChange}
              loader={loader}
              placeholder="Enter your password"
              className="w-full border border-gray-300 bg-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition hover:shadow-md"
            />

            <MainButton
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"
              text="Login"
              loader={loader}
              loaderSize={10}
            />
          </motion.form>
        </div>
      </motion.div>
      <ToastContainer position="top-right" autoClose={2000} limit={3} />
    </div>
  );
};

export default AdminLogin;
