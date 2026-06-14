import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import path from "path";
import uploadconfig from "@config/upload";
import fs from "fs";
import User from "../typeorm/entities/User";    

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

export default class UpdateUserAvatarService {
    public async execute({user_id, avatarFilename}: IRequest): Promise<User>{
        const userRepository = new UsersRepository();

        const user = await userRepository.findById(user_id);

        if(!user){
            throw new AppError("User not found", 404);
        }

        if(user.avatar){
            const userAvatarFilePath = path.join(uploadconfig.directory, user.avatar);

            try{
                const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
                if(userAvatarFileExists){
                    await fs.promises.unlink(userAvatarFilePath);
                }
            }   
             catch (err) {
                console.log("Avatar file not found, skipping deletion.");
            }
        }

        user.avatar = avatarFilename;

        await userRepository.createUser(user);
        return user;
    }
}