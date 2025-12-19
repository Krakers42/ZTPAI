import prisma from '../../prismaClient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRES = 60 * 30; // 30 minutes

function sendToken(res, user) {
  const payload = {
    id_user: user.id_user,
    role: user.user_details?.role || 'user',
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: JWT_EXPIRES * 1000,
  });

  const { password, ...userSafe } = user;

  return res.status(200).json({
    user: userSafe,  
  });
}

export async function register(req, res, next) {
  try {
    const { email, password, name, surname, role = 'user' } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required!' });
    }

    const exist = await prisma.user.findUnique({ where: { email } });
    if (exist) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const userDetails = await prisma.userDetails.create({
      data: { name, surname, role },
    });

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        id_user_details: userDetails.id_user_details,
      },
      include: { user_details: true },
    });

    return sendToken(res, user);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required!' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { user_details: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    return sendToken(res, user);
  } catch (err) {
    next(err);
  }
}

export function logout(req, res) {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax',
  });

  return res.json({ ok: true });
}

export async function me(req, res) {
  const userId = req.user?.id_user;

  if (!userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = await prisma.user.findUnique({
    where: { id_user: userId },
    include: { user_details: true },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { password, ...safe } = user;

  return res.json({
    user: safe,
  });
}