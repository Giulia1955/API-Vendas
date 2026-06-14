import { AppDataSource } from "@shared/typeorm/data-source";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { compare, hash } from "bcryptjs";

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
}

export default class UpdateProfileService {
    public async execute({user_id, name, email, password, old_password}: IRequest): Promise<User>{
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({
            where: {
                id: user_id
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

        const userUpdatedEmail = await userRepository.findOne({
            where: {
                email
            }
        });

        if (userUpdatedEmail && userUpdatedEmail.id !== user_id) {
            throw new Error("There is already a user with this email");
        }

        if (password && !old_password) {
            throw new Error("You need to inform the old password to set a new password");
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);
            
            if (!checkOldPassword) {
                throw new Error("Old password does not match");
            }

            user.password = await hash(password, 8);

        }

        user.name = name;
        user.email = email;

        await userRepository.save(user);

        return user;
    }
}   
