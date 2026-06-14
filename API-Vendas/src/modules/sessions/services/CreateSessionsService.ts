import User from "@modules/users/typeorm/entities/User";
import { UsersRepository } from "@modules/users/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { hash, compare } from "bcryptjs"; 
import { sign } from "jsonwebtoken";
import authconfig from "@config/auth";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

export default class CreateSessionsService {
    public async execute({email, password}: IRequest): Promise<IResponse>{
        const userRespository = new UsersRepository();

        const user = await userRespository.findByEmail(email);

        if(!user){
            throw new AppError("Incorrect email/password", 401);
        }

        const passwordConfirmed = await compare(password, user.password);

        if(!passwordConfirmed){
            throw new AppError("Incorrect email/password", 401);
        }

        const token = sign({}, authconfig.jwt.secret, {
            subject: user.id,
            expiresIn:'1d'
        });
        
        return { user, token };
    }
}