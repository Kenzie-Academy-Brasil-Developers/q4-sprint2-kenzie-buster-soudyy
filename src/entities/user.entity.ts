import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Cart } from "./cart.entity";
import { Dvds } from "./dvd.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id?: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  isAdm?: boolean;

  @OneToOne(() => Cart, (cart) => cart.newUser, { eager: true })
  orders: Cart[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
