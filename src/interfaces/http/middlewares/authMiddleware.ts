import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from './errorHandler';

interface TokenPayload {
  sub: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: string;
      };
    }
  }
}

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não fornecido', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as TokenPayload;

    request.user = {
      id: decoded.sub,
      role: decoded.role
    };

    return next();
  } catch {
    throw new AppError('Token inválido', 401);
  }
}