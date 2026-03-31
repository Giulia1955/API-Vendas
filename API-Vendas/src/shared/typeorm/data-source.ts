import Product from "API-Vendas/src/modules/products/typeorm/entities/Product";
import path from "path";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "docker",
    database: "apivendasta",
    synchronize: false,
    entities: [Product],
    migrations: [path.join("API-Vendas", "src", "shared", "typeorm", "migrations", "*.ts")]
});