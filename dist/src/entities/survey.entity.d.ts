import { Company } from './company.entity';
export declare class Survey {
    id: number;
    company: Company;
    title: string;
    description: string;
    format: object;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
