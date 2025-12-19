export function errorHandler(err, _req, res, _next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
}

export function notFoundHandler(_req, res) {
  res.status(404).json({ error: "Not Found" });
}
