import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';

export const authJwt = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if(authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err) => {
            if(err) {
                return response.sendStatus(403);
            }
            next();
        })
    } else {
        response.sendStatus(401);
    }
}

