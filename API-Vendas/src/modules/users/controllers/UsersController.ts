import { NextFunction, Request, Response } from "express";
import ListUsersService from "../services/ListUserService";
import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserServive";

export default class UsersController {
    public async index(req: Request, res: Response, next: NextFunction){
        try {
            const service = new ListUserService();
            const users = await service.execute();
            
            return res.json(users);
        } catch (err) {
            next(err);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction){
        try {
            const { name, email, password } = req.body;
            
            const service = new CreateUserService();
            const user = await service.execute({name, email, password});
            
            return res.json(user);
        } catch (err) {
            next(err);
        }
    }

}