export function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: "Not Found" });
}
