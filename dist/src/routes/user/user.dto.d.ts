import { EType } from "../../entities/user.entity";
export declare class GetUsersDto {
    companyId?: number;
    filter?: string;
    limit?: number;
    page?: number;
}
export declare class PostUsersDto {
    name: string;
    email: string;
    password?: string;
    type: EType;
    companyId: number;
}
