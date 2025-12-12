import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre_producto: string;

  @Column()
  descripcion: string;

  @Column()
  precio: number;

  @Column()
  stock: number;

  @Column()
  imagen_url: string;
}