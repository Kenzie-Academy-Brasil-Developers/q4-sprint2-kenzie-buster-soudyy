import {
  Column,
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Cart } from "./cart.entity";
import { Dvds } from "./dvd.entity";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id?: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  isAdm?: boolean;

  // @OneToMany((type) => Dvds, (dvd) => dvd.owner, {
  //   eager: true,
  // })
  // dvds: Dvds[];

  // @OneToOne((type) => Cart, {
  //   eager: true,
  // })
  // @JoinColumn()
  // cart: Cart;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
