import { Router } from "express";
import Product from "../typeorm/entities/Product";
import ProductController from "../controllers/ProductController";
import { celebrate, Joi, Segments } from "celebrate";

const productRouter = Router();
const productController = new ProductController();

productRouter.get("/", async (req, res, next) => {
    try{
        await productController.index(req, res, next);
    } catch (error) {
        next(error);
    }
});

productRouter.get("/:id", (celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
})), async (req, res, next) => {
    try{
        await productController.show(req, res, next);
    } catch (error) {
        next(error);
    }
});

productRouter.post("/",
    (celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).min(0).positive().required(),
            quantity: Joi.number().min(0).positive().required()
        }
    })), async (req, res, next) => {
    try{
        await productController.create(req, res, next);
    } catch (error) {
        next(error);
    }
});

productRouter.put("/:id", celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).min(0).positive().required(),
        quantity: Joi.number().min(0).positive().required()
    }
}), async (req, res, next) => {
    try{
        await productController.update(req, res, next);
    } catch (error) {
        next(error);
    }
});

productRouter.delete("/:id", celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), async (req, res, next) => {
    try{
        await productController.delete(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default productRouter;