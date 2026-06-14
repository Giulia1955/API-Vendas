
import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import CustomerRepostitory from "../typeorm/repostitories/CustomerRepostitory";

interface IRequest {
  name: string;
  email: string;
}
export default class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
        const customerRepository = new CustomerRepostitory();

        const emailExists = await customerRepository.findByEmail(email);
        if (emailExists) {
            throw new AppError("Email already in use.");
        }

        const customer = await customerRepository.createCustomer({ name, email });
        return customer;
    }
}