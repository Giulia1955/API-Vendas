import { Repository } from "typeorm";
import Product from "../entities/Product";
import { AppDataSource } from "API-Vendas/src/shared/typeorm/data-source";

export default class ProductRepository {
    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Product);
    }

    public async findByName(name: string): Promise<Product | null> {
        const product = await this.ormRepository.findOne({ where: { name } });
        return product || null;
    }

}