import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Dvds } from "./dvd.entity";

@Entity()
export class Stock {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  quantity: number;

  @OneToOne(() => Dvds, (dvd) => dvd.stock, { nullable: false })
  @JoinColumn()
  dvd: Dvds;
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
