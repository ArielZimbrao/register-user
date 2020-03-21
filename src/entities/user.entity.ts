import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { CreateUser } from 'src/user/dto/create-user.dto';

@Entity()
export class User extends BaseEntity {

  constructor (user?: CreateUser) {
    super()

    if (user) {
      this.name = user.name;
      this.lastName = user.lastName;
      this.email = user.email;
      this.phone = user.phone;
      this.password = user.password;
    }

  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  lastName: string;

  @Column({ length: 500 })
  email: string;

  @Column({ length: 100 })
  phone: string;

  @Column({ length: 512 })
  password: string

  @Column({
    type: 'bool',
    default: true
  })
  enable: boolean;
}