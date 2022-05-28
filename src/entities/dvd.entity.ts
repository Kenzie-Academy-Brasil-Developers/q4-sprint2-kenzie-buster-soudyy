import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Stock } from "./stock.entity";
import { User } from "./user.entity";

@Entity()
export class Dvds {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  duration: string;

  @OneToOne(() => Stock, {
    eager: true,
  })
  @JoinColumn()
  stock: Stock;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
