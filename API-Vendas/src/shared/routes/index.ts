import { Router } from "express";
import nodeHttp = require("node:http");

const routes = Router();

routes.get('/', (request, response) => {
    response.json({message: 'Hello po'});
    return;
})

export default routes;