import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({ type: "varchar", length: 100 })
    socialReason: string;

    @Column({ type: "varchar", length: 100 })
    business: string;

    @Column({ type: "varchar", length: 50 })
    email: string;
    
    @Column({ type: "varchar", length: 10 })
    phone: string;
    
    @Column({ type: "varchar", length: 100 })
    address: string;

    @Column({ type: "varchar", length: 50 })
    neighborhood: string;
    
    @Column({ type: "varchar", length: 5 })
    postalCode: string;
    
    @Column({ default: false })
    isDeleted: boolean;

    @Column({ type: 'timestamp', default: () =>  "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column({ type: 'timestamp', default: () =>  "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}