const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    height: "48px",
    borderColor: "#ff7700",
    borderRadius: "8px",
    backgroundColor: "#222b45", // Input background color
    color: "#ffffff", // Text color inside input
    boxShadow: state.isFocused ? "0 0 0 2px #ff7700" : "none",
    transition: "border 0.2s, box-shadow 0.2s",
    "&:hover": { borderColor: "#ff7700" },
    "&:focus-within": { outline: "none", boxShadow: "0 0 0 2px #ff7700" }, // Equivalent to focus:ring-1
  }),
  placeholder: (base) => ({
    ...base,
    color: "#888888",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#ffffff", // Selected text color
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#222b45", // Dropdown menu background
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? "#ff7700" : "#222b45", // Different color on hover
    color: "#ffffff", // Text color
    cursor: "pointer",
  }),
};

export default customSelectStyles;
