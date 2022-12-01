import { Survey } from './survey.entity';
import { User } from './user.entity';
export declare class Answer {
    id: number;
    survey: Survey;
    user: User;
    format: object;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
