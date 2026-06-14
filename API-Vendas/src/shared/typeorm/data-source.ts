import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import Product from "@modules/products/typeorm/entities/Product";
import User from "@modules/users/typeorm/entities/User";
import UserTokens from "@modules/users/typeorm/entities/UserTokens";
import Customer from "@modules/customers/typeorm/entities/Customer";
import OrderProducts from "@modules/orders/typeorm/entities/OrderProducts";
import Order from "@modules/orders/typeorm/entities/Order";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "docker",
    database: "apivendas",
    synchronize: false, 
    logging: false,
    entities: [Product, User, UserTokens, Customer, OrderProducts, Order],
    migrations: [path.join(__dirname, "..", "typeorm", "migrations", "*.{ts,js}")],
    subscribers: [],
});