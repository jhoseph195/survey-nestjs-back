import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';
import { User } from './user.entity';

export enum EType {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    CAPTURIST = 'CAPTURIST'
}

@Entity()
export class Session {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => User)
    user: User
    
    @Column({ type: "varchar", length: 100 })
    token: string;

    @Column({ type: 'timestamp'})
    expires: Date;
}