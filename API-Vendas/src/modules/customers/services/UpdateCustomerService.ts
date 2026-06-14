import Customer from "../typeorm/entities/Customer";
import CustomerRepostitory from "../typeorm/repostitories/CustomerRepostitory";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
    name: string;
    email: string;
}

export default class UpdateCustomerService {
    public async execute({ id, name, email }: IRequest): Promise<Customer> {
        const customerRepository = new CustomerRepostitory();
        const customer = await customerRepository.findById(id);
        if (!customer) {
            throw new AppError("Customer not found.");
        }
        
        const emailExists = await customerRepository.findByEmail(email);
        if (emailExists && email !== customer.email) {
            throw new AppError("Email already in use.");
        }

        customer.name = name;
        customer.email = email;

        await customerRepository.saveCustomer(customer);
        return customer;
    }
}