import productRouter from "API-Vendas/src/modules/products/routes/product.routes";
import sessionsRouter from "API-Vendas/src/modules/sessions/routes/sessions.routes";
import passwordRouter from "API-Vendas/src/modules/users/routes/password.routes";
import userRouter from "API-Vendas/src/modules/users/routes/users.routes";
import { Router } from "express";
import nodeHttp = require("node:http");

const routes = Router();
routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;