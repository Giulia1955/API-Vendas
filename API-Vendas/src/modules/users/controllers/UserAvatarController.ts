import { NextFunction, Request, Response } from "express";
import UpdateUserAvatarService from "../services/CreateUserAvatar";

export default class UserAvatarController {
    public async update(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const updateAvatar = new UpdateUserAvatarService();
            const user = await updateAvatar.execute({
                user_id: req.user.id,
                avatarFilename: req.file?.filename as string
            });
            return res.json(user);
        } catch (err) {
            next(err);
        }   
    }
}      