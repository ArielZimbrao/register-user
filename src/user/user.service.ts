import { Injectable } from '@nestjs/common';
import { InvalidToken, UserNonexistent } from '../exception';
import { User } from 'src/entities/user.entity';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user';

@Injectable()
export class UserService {

  async authentication(token: string) {
    try {
      const tokenDec = (Buffer.from(token, 'base64')).toString('utf8');

      const param = tokenDec.split('|');

      const user: User = await User.findOne({
        where: {
          email: param[0],
          password: param[1]
        }
      })

      if (user) {
        const dt = new Date();
        dt.setMinutes(dt.getMinutes() + parseInt(process.env.TEMPO_LOGIN_MIN))
        return Buffer.from(user.id.toString() + '|' + dt.valueOf()).toString('base64');
      } else {
        throw new UserNonexistent()
      }
    } catch(err) {
      throw new InvalidToken()
    }

  }

  async getList(): Promise<User[]> {
    return User.find();
  }

  async getOne(idUser: Number): Promise<User> {
    return User.findOne({
      where: {
        id: idUser
      }
    })
  }

  async deleteUser(idUser: Number) {
    const user: User = await User.findOne({
      where: {
        id: idUser
      }
    })

    if (user) {
      return user.remove()
    } else {
      throw new UserNonexistent()
    }
  }

  async createUser(newUser: CreateUser): Promise<User> {
    const user: User = new User(newUser);
    return user.save();
  }

  async updateUser(updateUser: UpdateUser) {
    const user: User = await User.findOne({
      where: {
        id: updateUser.id
      }
    });

    if (user) {
      if (updateUser.name !== null) user.name = updateUser.name;
      if (updateUser.lastName !== null) user.lastName = updateUser.lastName;
      if (updateUser.email !== null) user.email = updateUser.email;
      if (updateUser.phone !== null) user.phone = updateUser.phone;
      if (updateUser.password !== null) user.password = updateUser.password;
      if (updateUser.enable !== null) user.enable = updateUser.enable;

      return user.save();
    } else {
      throw new UserNonexistent()
    }

  }
}
