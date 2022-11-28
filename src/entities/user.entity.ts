import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';

export enum EType {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    CAPTURIST = 'CAPTURIST'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Company)
    company: Company
    
    @Column({ type: "varchar", length: 50 })
    name: string;

    @Column({ type: "varchar", length: 50 })
    email: string;
    
    @Column({ type: "varchar", length: 100 })
    password: string;
    
    @Column({
        type: 'enum',
        enum: EType,
        default: EType.CAPTURIST
    })
    type: EType;
    
    @Column({ default: false })
    isDeleted: boolean;

    @Column({ type: 'timestamp', default: () =>  "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column({ type: 'timestamp', default: () =>  "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}