// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;  // "definite assignment assertion" (!) to tell TypeScript that the property will be initialized in the constructor.

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column()
  mobile!: string;

  constructor() {
    super();
    // Initialize properties in the constructor if needed.
  }
}

