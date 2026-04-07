import { AppDataSource } from "API-Vendas/src/shared/typeorm/data-source";
import Product from "../typeorm/entities/Product";
import AppError from "API-Vendas/src/shared/errors/AppError";

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export default class UpdateProductService {
    public async execute({ id, name, price, quantity }: IRequest): Promise<Product>{
        const productRepository = AppDataSource.getRepository(Product);

        const product = await productRepository.findOneBy({id});

        if (!product) {
            throw new AppError("Product not found.");
        }

        const productExists = await productRepository.findOne({ where: { name } });

        if (productExists && productExists.id !== product.id) {
            throw new AppError("There is already a product with this name.");
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productRepository.save(product);

        return product;
    } 
}