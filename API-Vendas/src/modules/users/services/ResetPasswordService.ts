import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UserTokensRepository } from "../typeorm/repositories/UserTokensRepository";
import {hash} from "bcryptjs";
import { addHours, isAfter } from "date-fns";

interface Irequest {
    token: string;
    password: string;
}

export default class ResetPasswordService { 
    public async execute({token, password}: Irequest): Promise<void> {
        const userRepository = new UsersRepository();
        const userTokenRepository = new UserTokensRepository();

        const userToken = await userTokenRepository.findByToken(token);
        
        if(!userToken){
            throw new AppError("User token not found", 404);
        }

        const user = await userRepository.findById(userToken.user_id);
        if(!user){
            throw new AppError("User not found", 404);
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if(isAfter(Date.now(), compareDate)){
            throw new AppError("Token expired", 400);
        }

        user.password = await hash(password, 8);
        
        await userRepository.save(user);
    }
}