import { Repository } from "typeorm";
import Customer from "../entities/Customer";
import { AppDataSource } from "@shared/typeorm/data-source";

export default class CustomerRepostitory {
    private ormRepository: Repository<Customer>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Customer);
    }

    public async findByName(name: string): Promise<Customer | null> {
        return this.ormRepository.findOne({ where: { name } });
    }
    
    public async findByEmail(email: string): Promise<Customer | null> {
        return this.ormRepository.findOne({ where: { email } });
    }

    public async findById(id: string): Promise<Customer | null> {
        return this.ormRepository.findOne({ where: { id } });
    }

    public async findAll(): Promise<Customer[]> {
        return this.ormRepository.find();
    }

    public async createCustomer(customerData: Partial<Customer>): Promise<Customer> {
        const customer = this.ormRepository.create(customerData);
        await this.ormRepository.save(customer);
        return customer;
    }

    public async saveCustomer(customer: Customer): Promise<Customer> {
        return this.ormRepository.save(customer);
    }

    public async deleteCustomer(customer: Customer): Promise<void> {
        await this.ormRepository.remove(customer);
    }
}