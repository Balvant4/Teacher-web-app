import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const InputForm = ({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
  className = "",
  id,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={id} className="block mb-2 text-gray-400 font-medium">
        {label}
      </label>
      <div className="relative flex items-center">
        {/* Left-side Icon */}
        {Icon && <Icon className="absolute left-4 text-gray-400 text-xl" />}

        {/* Input Field */}
        <input
          name={name}
          id={id}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
          className={`w-full h-12 pl-4 pr-10 border border-[#ff7700] rounded-lg focus:ring-1 focus:ring-[#ff7700] focus:outline-none bg-[#222b45] text-white placeholder-gray-400 ${
            Icon ? "pl-12" : ""
          }`}
          aria-label={placeholder}
        />

        {/* Toggle Password Visibility Button */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 text-gray-400 hover:text-white"
          >
            {showPassword ? (
              <MdVisibilityOff size={24} />
            ) : (
              <MdVisibility size={24} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputForm;
