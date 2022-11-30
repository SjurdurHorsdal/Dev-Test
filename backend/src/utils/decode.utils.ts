import * as jwt from 'jsonwebtoken';

export const decodeToken = (token: string) => {
    const decodedToken = jwt.decode(token);
    return decodedToken;
}

