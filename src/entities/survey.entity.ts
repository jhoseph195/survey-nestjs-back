import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class Survey {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @ManyToOne(() => Company)
    company: Company
    
    @Column({ type: "varchar", length: 100 })
    title: string;

    @Column({ type: "varchar", length: 250 })
    description: string;

    @Column({ type: "json", nullable: true})
    format: object;
    
    @Column({ default: false })
    isDeleted: boolean;

    @Column({ type: 'timestamp', default: () =>  "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column({ type: 'timestamp', default: () =>  "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}