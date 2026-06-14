import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import CustomerRepostitory from "../typeorm/repostitories/CustomerRepostitory";

interface IRequest {
  id: string;
}

export default class DeleteCustomerService {
    public async execute({ id }: IRequest): Promise<void> {
        const customerRepository = new CustomerRepostitory();
        const customer = await customerRepository.findById(id);
        if (!customer) {
            throw new AppError("Customer not found.");
        }
        await customerRepository.deleteCustomer(customer);
    }
}
