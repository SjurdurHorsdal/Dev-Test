export interface AuthDto {
    login: string;
    password: string;
}

export interface JwtDecodedPayload {
    login: string;
    password: string;
    iat: number;
    exp: number;
}