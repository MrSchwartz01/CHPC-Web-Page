import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  imagen_url: string;
}