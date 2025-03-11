import React, { useState } from "react";
import { InputForm, MainButton } from "../../components/index.js";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const signupVariant = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.4 } },
};

const contentVariant = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.8 } },
};

const TeacherSignup = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    teachingMode: "Online",
    subjectsTaught: [],
    subjectInput: "",
    classesTaught: "",
    experience: "",
    language: [],
    languageInput: "",
    biography: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    if ((name === "experience" || name === "classesTaught") && !/^\d*$/.test(value)) {
      return;
    }

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addSubject = () => {
    if (!data.subjectInput.trim()) {
      toast.warn("Subject cannot be empty!");
      return;
    }

    if (data.subjectsTaught.includes(data.subjectInput.trim())) {
      toast.warn("Subject already added!");
      return;
    }

    setData((prevData) => ({
      ...prevData,
      subjectsTaught: [...prevData.subjectsTaught, prevData.subjectInput.trim()],
      subjectInput: "", // Clear input field
    }));
  };

  // Function to remove subject
  const removeSubject = (index) => {
    setData((prevData) => ({
      ...prevData,
      subjectsTaught: prevData.subjectsTaught.filter((_, i) => i !== index),
    }));
  };

  const addLanguage = () => {
    if (!data.languageInput.trim()) {
      toast.warn("Language cannot be empty!");
      return;
    }

    if (data.language.includes(data.languageInput.trim())) {
      toast.warn("Language already added!");
      return;
    }

    setData((prevData) => ({
      ...prevData,
      language: [...prevData.language, prevData.languageInput.trim()],
      languageInput: "", // Clear input field
    }));
  };

  // Function to remove subject
  const removeLanguage = (index) => {
    setData((prevData) => ({
      ...prevData,
      language: prevData.language.filter((_, i) => i !== index),
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    for (let key in data) {
      if (key !== "subjectsTaught" && key !== "subjectInput" && key != "language" && key != "languageInput" && !data[key]) {
        toast.warn(`"${key}" is required!`);
        return;
      }
    }

    if (data.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits!");
      return;
    }

    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      toast.success("Signup Successful!");
      console.log("Final Submitted Data:", data);
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('../../public/Vector.jpg')] bg-cover bg-center w-screen relative p-6">
      <div className="absolute inset-0 bg-black/40"></div>

      <motion.div
        className="rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 p-8"
        variants={signupVariant}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 className="text-2xl font-bold text-center text-white mb-6" variants={contentVariant}>
          Teacher Signup
        </motion.h2>

        <motion.form onSubmit={onSubmit} className="grid grid-cols-1 gap-4" variants={contentVariant}>

          {/* Input Fields */}
          {Object.keys(data).map((key) => (
            key !== "subjectInput" && key !== "subjectsTaught" && key != "language" && key != "languageInput" && (
              <div key={key} className="flex flex-col gap-2">
                <label className="text-white font-semibold capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}{key === "experience" ? " (Years)" : ""}
                </label>

                {/* Dropdown for Teaching Mode */}
                {key === "teachingMode" ? (
                  <select
                    name={key}
                    value={data[key]}
                    onChange={onChange}
                    className="border border-gray-300 bg-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none"
                  >
                    <option className="bg-gray-800 text-white" value="Online">Online</option>
                    <option className="bg-gray-800 text-white" value="Offline">Offline</option>
                    <option className="bg-gray-800 text-white" value="Hybrid">Hybrid</option>
                  </select>

                ) : (
                  <InputForm
                    type={
                      key === "password"
                        ? "password"
                        : key === "phone" || key === "experience" || key === "classesTaught"
                          ? "number"
                          : "text"
                    }
                    name={key}
                    value={data[key]}
                    onChange={onChange}
                    loader={loader}
                    placeholder={`Enter your ${key.replace(/([A-Z])/g, ' $1')}`}
                    className="border border-gray-300 bg-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                )}
              </div>
            )
          ))}

          {/* Subjects Taught Section */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-semibold">Subjects Taught</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="subjectInput"
                value={data.subjectInput}
                onChange={onChange}
                placeholder="Enter subject"
                className="border border-gray-300 bg-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition flex-grow"
              />
              <button type="button" onClick={addSubject} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Add
              </button>
            </div>

            {/* Display added subjects */}
            <div className="flex flex-wrap gap-2 mt-2">
              {data.subjectsTaught.map((subject, index) => (
                <div key={index} className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-full">
                  <span>{subject}</span>
                  <button onClick={() => removeSubject(index)} className="text-sm text-white hover:text-gray-200">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Section */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-semibold">Languages</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="languageInput"
                value={data.languageInput}
                onChange={onChange}
                placeholder="Enter language"
                className="border border-gray-300 bg-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition flex-grow"
              />
              <button type="button" onClick={addLanguage} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Add
              </button>
            </div>

            {/* Display added languages */}
            <div className="flex flex-wrap gap-2 mt-2">
              {data.language.map((lang, index) => (
                <div key={index} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full">
                  <span>{lang}</span>
                  <button onClick={() => removeLanguage(index)} className="text-sm text-white hover:text-gray-200">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <MainButton
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"
              text="Signup"
              loader={loader}
              loaderSize={10}
            />
          </div>

        </motion.form>
      </motion.div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default TeacherSignup;
