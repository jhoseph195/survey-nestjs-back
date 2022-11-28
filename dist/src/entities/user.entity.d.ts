import { Company } from './company.entity';
export declare enum EType {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    CAPTURIST = "CAPTURIST"
}
export declare class User {
    id: number;
    company: Company;
    name: string;
    email: string;
    password: string;
    type: EType;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
