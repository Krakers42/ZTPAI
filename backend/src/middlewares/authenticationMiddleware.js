import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export function authMiddleware(req, res, next) {
  const token =
    req.cookies?.token ||
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    req.user = { id_user: payload.id_user, role: payload.role };
  } catch (err) {
    console.error("Błąd weryfikacji tokena:", err.message);
    req.user = null;
  }

  next();
}

export function requireAuth(req, res, next) {
  if (!req.user || !req.user.id_user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}
