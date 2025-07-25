import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';

// Extend Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
            };
        }
    }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction ) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ error: 'Access token required' });   
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string};

        // Get user from database
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true, name: true }
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });            
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
}