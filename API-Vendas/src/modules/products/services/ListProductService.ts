import { AppDataSource } from "API-Vendas/src/shared/typeorm/data-source";
import Product from "../typeorm/entities/Product";

export default class ListProductService {
    public async execute(): Promise<Product[]> {
        const productRepository = AppDataSource.getRepository(Product);
        return productRepository.find();
    }
}