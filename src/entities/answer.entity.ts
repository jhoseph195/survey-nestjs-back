import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Survey } from './survey.entity';
import { User } from './user.entity';

@Entity()
export class Answer {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @ManyToOne(() => Survey)
    survey: Survey
    
    @ManyToOne(() => User)
    user: User

    @Column({ type: "json", nullable: true})
    format: object;
    
    @Column({ default: false })
    isDeleted: boolean;

    @Column({ type: 'timestamp', default: () =>  "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column({ type: 'timestamp', default: () =>  "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}