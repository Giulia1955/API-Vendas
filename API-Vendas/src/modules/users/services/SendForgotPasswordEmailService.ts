import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UserTokensRepository } from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";
import path from "path";
import { link } from "fs";

interface Irequest {
    email: string;
}



export default class SendForgotPasswordEmailService {
    public async execute({email}: Irequest): Promise<void>{
        const userRepository = new UsersRepository();
        const userTokenRepository = new UserTokensRepository();

        const user = await userRepository.findByEmail(email);

        if(!user){
            throw new AppError("User not found", 404);
        }

        const { token } = await userTokenRepository.createUserToken(user.id);

        const forgotPasswordTemplate = path.resolve(__dirname, "..", "views", "forgot_password.hbs");
        //console.log(`Token de recuperação de senha: ${token}`);
        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: "Recuperação de senha para API-Vendas",
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3333/reset_password?token=${token}` 
                }
            }
        });
    }
}