import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user.entity";
import { Dvds } from "./dvd.entity";

@Entity()
export class Buy {
  @PrimaryColumn("uuid")
  readonly id: string;

  // @ManyToOne((type) => User, (user) => user.dvds)
  // user: User;

  @ManyToMany((type) => Dvds, {
    eager: true,
  })
  @JoinTable()
  products: Dvds[];

  @Column("float")
  total: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
