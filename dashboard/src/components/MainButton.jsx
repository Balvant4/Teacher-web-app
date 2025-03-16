import React from "react";
import { PropagateLoader } from "react-spinners";

function MainButton({ text, className, onClick, loader }) {
  const overrideStyle = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <button
      onClick={onClick}
      disabled={loader}
      type="submit"
      className={` px-4 py-3 text-white font-medium   transition duration-300 disabled:opacity-50  cursor-pointer ${className}`}
    >
      {loader ? (
        <PropagateLoader color="#fff" cssOverride={overrideStyle} />
      ) : (
        text
      )}
    </button>
  );
}

export default MainButton;
