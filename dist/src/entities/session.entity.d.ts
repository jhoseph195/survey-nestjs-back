import { User } from './user.entity';
export declare enum EType {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    CAPTURIST = "CAPTURIST"
}
export declare class Session {
    id: number;
    user: User;
    token: string;
    expires: Date;
}
