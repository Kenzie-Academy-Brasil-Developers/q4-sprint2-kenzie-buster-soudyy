import {
  Column,
  Entity,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Dvds } from "./dvd.entity";
import { User } from "./user.entity";

@Entity()
export class Cart {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  paid: boolean;

  @Column("float", { nullable: false })
  total: number;

  @ManyToOne(() => User, (user) => user.orders)
  newUser: User;

  @ManyToMany(() => Dvds, { eager: true })
  @JoinTable()
  dvd: Dvds[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
