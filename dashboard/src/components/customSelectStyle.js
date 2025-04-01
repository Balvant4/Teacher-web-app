const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    height: "48px",
    borderColor: "#ff7700",
    borderRadius: "8px",
    backgroundColor: "#222b45", // Ensures background stays dark
    color: "#ffffff",
    boxShadow: state.isFocused ? "0 0 0 2px #ff7700" : "none",
    transition: "border 0.2s, box-shadow 0.2s",
    "&:hover": { borderColor: "#ff7700" },
  }),
  input: (base) => ({
    ...base,
    color: "#ffffff", // Ensures text remains white
    backgroundColor: "transparent", // Prevents white background
  }),
  placeholder: (base) => ({
    ...base,
    color: "#888888",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#ffffff", // Ensures selected text remains white
    backgroundColor: "transparent", // Prevents white background on selection
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#ff7700", // Background color for selected values
    color: "#ffffff",
    borderRadius: "4px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#ffffff", // Ensures text inside multi-value stays white
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#ff5500", // Slightly darker shade on hover
      color: "#ffffff",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#222b45",
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? "#ff7700" : "#222b45",
    color: "#ffffff",
    cursor: "pointer",
  }),
};

export default customSelectStyles;
