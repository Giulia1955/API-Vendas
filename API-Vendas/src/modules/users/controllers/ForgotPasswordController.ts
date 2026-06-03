import { NextFunction, Request, Response } from "express";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";

export default class ForgotPasswordController {
    public async create(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const { email } = req.body;
            const sendFogotPasswordEmail = new SendForgotPasswordEmailService();
            await sendFogotPasswordEmail.execute({ email });
            return res.status(204).json();
        } catch (err) {
            next(err);
        }
    }
}