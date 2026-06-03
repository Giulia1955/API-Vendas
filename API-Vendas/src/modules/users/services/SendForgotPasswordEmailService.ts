import AppError from "API-Vendas/src/shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UserTokensRepository } from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from "API-Vendas/src/config/mail/EtherealMail";

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

        //console.log(`Token de recuperação de senha: ${token}`);
        await EtherealMail.sendMail({
            to: email,
            body: `Token de recuperação de senha: ${token}`
        });
    }
}