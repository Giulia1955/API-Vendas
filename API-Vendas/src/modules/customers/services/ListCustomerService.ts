import CustomerRepostitory from "../typeorm/repostitories/CustomerRepostitory";
import Customer from "../typeorm/entities/Customer";

export default class ListCustomerService {
    public async execute(): Promise<Customer[]> {
        const customerRepository = new CustomerRepostitory();
        const customers = await customerRepository.findAll();
        return customers;
    }
}
