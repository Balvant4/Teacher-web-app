import { useCallback, useEffect, useState } from "react";
import InputForm from "../../components/InputForm";
import MainButton from "../../components/MainButton";
import Select from "react-select";
import customSelectStyles from "../../components/customSelectStyle";
import { Upload, User, Phone, Lock, Info, Clipboard, Mail } from "lucide-react";
import {
  ClassDetails,
  LanguageDetails,
  SubjectDetails,
  TeachingMode,
} from "../../components/StudyDetails.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { teacherRegister } from "../../store/Reducers/teacherAuthReducers.js";
import toast from "react-hot-toast";

const TeacherSignup = () => {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    phone: "",
    experience: "",
    biography: "",
    classCategory: [],
    subjectCategory: [],
    teachingMode: [],
    languageCategory: [],
    profileImage: null,
    profileImagePreview: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector(
    (state) => state.teacherAuth
  );

  const inputHandle = useCallback((e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSelectChange = (selectedOptions, field) => {
    setState((prev) => ({
      ...prev,
      [field]: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setState((prev) => ({
        ...prev,
        profileImage: file,
        profileImagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const submit = (e) => {
    e.preventDefault();

    // 🔹 Validation
    if (
      !state.username ||
      !state.email ||
      !state.password ||
      !state.fullName ||
      !state.phone
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // 🔹 Create FormData object
    const formData = new FormData();
    formData.append("username", state.username);
    formData.append("fullName", state.fullName);
    formData.append("email", state.email);
    formData.append("password", state.password);
    formData.append("phone", state.phone);
    formData.append("experience", state.experience);
    formData.append("biography", state.biography);

    // 🔹 Append arrays properly
    state.classCategory.forEach((cls) =>
      formData.append("classesTaught[]", cls)
    );
    state.subjectCategory.forEach((sub) =>
      formData.append("subjectsTaught[]", sub)
    );
    state.teachingMode.forEach((mode) =>
      formData.append("teachingMode[]", mode)
    );
    state.languageCategory.forEach((lang) =>
      formData.append("language[]", lang)
    );

    // 🔹 Append profile image if available
    if (state.profileImage) {
      formData.append("profilePicture", state.profileImage);
    }

    // 🔹 Dispatch the action
    dispatch(teacherRegister(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (successMessage) {
      toast.success(successMessage);
      setTimeout(() => navigate("/teacher/login"), 1500);
    }
  }, [error, successMessage, navigate]);

  return (
    <div className="flex items-center justify-center bg-[#101426] text-white w-full px-4">
      <div className="w-full max-w-4xl p-8 bg-[#222b45] rounded-xl shadow-lg my-10">
        <h2 className="text-3xl font-bold text-center">
          Welcome To Teaching Mode
        </h2>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <h1 className="text-xl font-bold">Account Information</h1>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <InputForm
              name="username"
              type="text"
              placeholder="Username"
              icon={User}
              value={state.username}
              onChange={inputHandle}
            />
            <InputForm
              name="email"
              type="email"
              placeholder="Email"
              icon={Mail}
              value={state.email}
              onChange={inputHandle}
            />
            <InputForm
              name="password"
              type="password"
              placeholder="Password"
              icon={Lock}
              value={state.password}
              onChange={inputHandle}
            />
          </div>

          <h1 className="text-xl font-bold pb-2 pt-5">Study Information</h1>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <Select
              options={ClassDetails}
              isMulti
              onChange={(selected) =>
                handleSelectChange(selected, "classCategory")
              }
              styles={customSelectStyles}
              placeholder="Select Class"
            />
            <Select
              options={SubjectDetails}
              isMulti
              onChange={(selected) =>
                handleSelectChange(selected, "subjectCategory")
              }
              styles={customSelectStyles}
              placeholder="Select Subject"
            />
            <Select
              options={TeachingMode}
              isMulti
              onChange={(selected) =>
                handleSelectChange(selected, "teachingMode")
              }
              styles={customSelectStyles}
              placeholder="Select Mode"
            />
            <Select
              options={LanguageDetails}
              isMulti
              onChange={(selected) =>
                handleSelectChange(selected, "languageCategory")
              }
              styles={customSelectStyles}
              placeholder="Select Language"
            />
          </div>

          <h1 className="text-xl font-bold pt-5">Personal Information</h1>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <InputForm
              name="fullName"
              type="text"
              placeholder="Full Name"
              icon={User}
              value={state.fullName}
              onChange={inputHandle}
            />
            <InputForm
              name="phone"
              type="tel"
              placeholder="Phone Number"
              icon={Phone}
              value={state.phone}
              onChange={inputHandle}
            />
            <InputForm
              name="experience"
              type="text"
              placeholder="Experience (Years)"
              icon={Clipboard}
              value={state.experience}
              onChange={inputHandle}
            />
            <InputForm
              name="biography"
              type="text"
              placeholder="Short Biography"
              icon={Info}
              value={state.biography}
              onChange={inputHandle}
            />
          </div>

          <h1 className="text-xl font-bold pt-5 pb-5">Upload Profile Image</h1>
          <label className="relative h-[15rem] w-full max-w-[25rem] bg-[#101426] flex flex-col items-center justify-center rounded-xl shadow-lg cursor-pointer hover:bg-[#1a1f3c] transition-all overflow-hidden">
            {state.profileImagePreview ? (
              <img
                src={state.profileImagePreview}
                alt="Profile Preview"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
              />
            ) : (
              <>
                <Upload size={40} className="text-white mb-2" />
                <span className="text-white font-semibold">Upload File</span>
              </>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>

          <MainButton
            text={loading ? "Signing Up..." : "Sign Up"}
            disabled={loading}
            className="my-4 w-full bg-[#ff7700] hover:bg-[#a74e00] rounded-xl text-white font-semibold py-3 transition duration-300 ease-in-out transform hover:scale-105"
          />
        </form>
      </div>
    </div>
  );
};

export default TeacherSignup;
