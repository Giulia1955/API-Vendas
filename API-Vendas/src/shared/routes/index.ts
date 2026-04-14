import productRouter from "API-Vendas/src/modules/products/routes/product.routes";
import { Router } from "express";
import nodeHttp = require("node:http");

const routes = Router();
routes.use('/products', productRouter);

routes.get('/', (request, response) => {
    response.json({message: 'Hello po'});
    return;
})

export default routes;