import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Stock {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column("float", { nullable: false })
  price: number;

  @Column({ nullable: false })
  quantity: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
