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
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={id} className="block mb-2 text-gray-700 font-medium">
        {label}
      </label>
      <div className="relative flex items-center">
        {Icon && <Icon className="absolute left-4 text-gray-400 text-xl" />}
        <input
          name={name}
          id={id}
          type={type}
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
          className={`w-full h-12 pl-4 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none ${
            Icon ? "pl-12" : ""
          }`}
          aria-label={placeholder}
        />
      </div>
    </div>
  );
};

export default InputForm;
