import { AppDataSource } from "API-Vendas/src/shared/typeorm/data-source";
import Product from "../typeorm/entities/Product";
import AppError from "API-Vendas/src/shared/errors/AppError";

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

export default class CreateProductService {
    public async execute({ name, price, quantity }: IRequest): Promise<Product>{
        const productRepository = AppDataSource.getRepository(Product);

        const productExists = await productRepository.findOne({ where: { name } });

        if (productExists) {
            throw new AppError("Product already exists.");
        }

        const product = productRepository.create({
            name,
            price,
            quantity
        });

        await productRepository.save(product);

        return product;
    } 
}