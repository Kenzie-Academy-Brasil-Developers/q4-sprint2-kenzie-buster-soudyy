import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { v4 as uuid } from "uuid";
import { Dvds } from "./dvd.entity";

@Entity()
export class Cart {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  paid: boolean;

  @Column("float", { nullable: false })
  total: number;

  @ManyToMany((type) => Dvds, {
    eager: true,
  })
  @JoinTable()
  dvds: Dvds[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
