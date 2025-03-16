const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error:", err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Internal Server Error",
    error: err.errors || err.message || "An unexpected error occurred", // Ensure a string
  });
};

export default errorHandler;
