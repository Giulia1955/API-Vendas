import ListCustomerService from "../services/ListCustomerService";
import { NextFunction, Request, Response} from "express";
import ShowCustomerService from "../services/ShowCustomerService";
import CreateCustomerService from "../services/CreateCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";

export default class CustomerController {
    public async index(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const ListCustomer = new ListCustomerService();
            const customers = await ListCustomer.execute();
            return res.json(customers);
        } catch (error) {
            next(error);
            return res;
        }
    }

    public async show(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = req.params.id as string;
            const ShowCustomer = new ShowCustomerService();
            const customer = await ShowCustomer.execute({ id });
            return res.json(customer);
        } catch (error) {
            next(error);
            return res;
        }
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { name, email } = req.body;
            const CreateCustomer = new CreateCustomerService();
            const customer = await CreateCustomer.execute({ name, email });
            return res.json(customer);
        } catch (error) {
            next(error);
            return res;
        }
    }   

    public async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const {name, email} = req.body;
            const id = req.params.id as string;
            const UpdateCustomer = new UpdateCustomerService();
            const customer = await UpdateCustomer.execute({ id, name, email });
            return res.json(customer);
        } catch (error) {
            next(error);
            return res;
        }       
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = req.params.id as string;
            const DeleteCustomer = new DeleteCustomerService();
            await DeleteCustomer.execute({ id });
            return res.status(204).send();
        } catch (error) {
            next(error);
            return res;
        }
    }
}
