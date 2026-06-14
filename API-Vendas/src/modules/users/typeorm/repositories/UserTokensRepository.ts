import { Repository } from "typeorm";
import UserTokens from "../entities/UserTokens";
import { AppDataSource } from "@shared/typeorm/data-source";

export class UserTokensRepository {
    private ormRepository: Repository<UserTokens>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(UserTokens);
    }

    public async findByToken(token: string): Promise<UserTokens | null> {
        const userToken = await this.ormRepository.findOne({ where: { token } });
        return userToken;
    }

    public async createUserToken(user_id: string): Promise<UserTokens> {
        const userToken = this.ormRepository.create({ user_id });
        await this.ormRepository.save(userToken);
        return userToken;
    }
}