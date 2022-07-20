import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const SECRET_KEY: Secret = 'JWT_Secret';

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const isAuthorized = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
     throw new Error();
   }

   const decoded = jwt.verify(token, SECRET_KEY);
   (req as CustomRequest).token = decoded;
   console.log(decoded)
   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
};
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
   
      if (!token) {
        throw new Error();
      }
   
      const decoded = jwt.verify(token, SECRET_KEY);
      (req as CustomRequest).token = decoded;
      next();
    } catch (err) {
       console.log(err)
      res.status(401).send('Please authenticate');
    }
   };
