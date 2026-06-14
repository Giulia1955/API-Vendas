import { Router } from "express";
import CustomerController from "../controllers/CustomerController";
import isAuthenticated from "@shared/middlewares/isAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.use(isAuthenticated);

customerRouter.get("/",  async (req, res, next) => {
    try{
        await customerController.index(req, res, next);   
    } catch (error) {
        next(error);
    }
});

customerRouter.get(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    async (req, res, next) => {
        try {
            await customerController.show(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);

customerRouter.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required()
        }
    }),
    async (req, res, next) => {
        try {
            await customerController.create(req, res, next);    
        } catch (error) {
            next(error);
        }
    }
);

customerRouter.put(
    "/:id",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required()
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    async (req, res, next) => {
        try {
            await customerController.update(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);

customerRouter.delete(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    async (req, res, next) => {
        try {
            await customerController.delete(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);
  

export default customerRouter;