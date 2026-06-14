import CustomerRepostitory from "@modules/customers/typeorm/repostitories/CustomerRepostitory";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrderRepository";
import ProductRepository from "@modules/products/typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import OrderProducts from "../typeorm/entities/OrderProducts";

interface IProduct{
    id: string;
    quantity: number;
}

interface IRequest{
    customer_id: string;
    products: IProduct[];
}

export default class CreateOrderService{
    public async execute ({customer_id, products}: IRequest):Promise<Order>{
        const orderRepository = new OrdersRepository();
        const customerRepository = new CustomerRepostitory();
        const productRepository = new ProductRepository();

        const customerExists = await customerRepository.findById(customer_id);
        if(!customerExists){
            throw new AppError("Could not find any customer with the given id")
        }

        const existsProducts = await productRepository.findAllById(products);
        if (!existsProducts){
            throw new AppError("Could not find any product with the given id")
        };

        const existsProductsIds = existsProducts.map((product)=>product.id);
        const checkInexistentsProducts = products.filter(
            (product) => !existsProductsIds.includes(product.id)
        );

        if(checkInexistentsProducts.length){
            throw new AppError(` Could not find product ${checkInexistentsProducts[0]!.id}`);
        }

        const quantityUnavailable = products.filter(
            (product) => existsProducts.find(
                (p) => p.id === product.id!
            )!.quantity < product.quantity
        );

        if (quantityUnavailable.length){
            throw new AppError(
                `the quantitity of ${quantityUnavailable[0]!.quantity} is not available for ` 
            );
        }

        const serializedProducts = products.map((product)=> ({
            product_id : product.id,
            quantity : product.quantity,
            price : existsProducts.find((p) => p.id === product.id)!.price
        }));

        const order = await orderRepository.createOrder({
            customer: customerExists,
            products: serializedProducts
        });

        const { orders_products } = order;
        const updateProducts = existsProducts.map((product)=> {
            const orderedProduct = orders_products.find(
                (OrderProducts) => OrderProducts.product.id === product.id
            );

            if (orderedProduct){
                product.quantity -= orderedProduct.quantity;
            }
            return product;
        });

        await productRepository.save(updateProducts);
        return order;

    }
}
