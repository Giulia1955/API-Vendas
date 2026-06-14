import {Router} from "express";
import UsersController from "../controllers/UsersController";
import { celebrate, Joi, Segments } from "celebrate";
import multer from "multer";
import uploadConfig from "@config/upload";
import UserAvatarController from "../controllers/UserAvatarController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const userRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

userRouter.get("/", async (req, res, next) => {
    try {
        await usersController.index(req, res, next);
    } catch (err) {
        next(err);
    }
});

userRouter.post("/",celebrate({[Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
}}), async (req, res, next) => {
    try {
        await usersController.create(req, res, next);
    } catch (err) {
        next(err);
    }   
})

userRouter.patch("/avatar", isAuthenticated, upload.single("avatar"), async (req, res, next) => {
    try {
        await usersAvatarController.update(req, res, next);
    } catch (err) {
        next(err);
    }
});

export default userRouter;