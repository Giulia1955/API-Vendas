import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import authconfig from "@config/auth";

interface ITokenPayload {
    sub: string;
    iat: number;
    exp: number;
}

export default function isAuthenticated(
    request: Request, response: Response, next: NextFunction
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error("Token is missing");
    }

    const [, token] = authHeader.split(" ");
    try {
        const decodedToken = verify(token, authconfig.jwt.secret);
        const { sub } = decodedToken as ITokenPayload;
        request.user = {id:sub};
        return next();

    } catch (err) {
        throw new Error("Invalid token");
    }
}