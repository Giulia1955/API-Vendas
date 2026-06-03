import AppError from "API-Vendas/src/shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import { AppDataSource } from "API-Vendas/src/shared/typeorm/data-source";

interface IRequest {
    id: string;
}
export default class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product> {
        const productRepository = AppDataSource.getRepository(Product);

        const product = await productRepository.findOneBy({id});

        if (!product) {
            throw new AppError("Product not found.");
        }

        return product;
    }

}