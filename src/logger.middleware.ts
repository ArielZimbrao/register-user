import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Unauthorized } from './exception';
import { User } from './entities/user.entity';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    if (req.baseUrl !== '/user/auth') {

      if (req.headers.authorization) {
        const tokenDec = (Buffer.from(req.headers.authorization, 'base64')).toString('utf8');

        const param = tokenDec.split('|');

        const user: User = await User.findOne({
          where: {
            id: param[0]
          }
        });

        if (!user) throw new Unauthorized();

        const dtNow = new Date();

        if (parseInt(param[1]) < dtNow.valueOf()) throw new Unauthorized();
        next();
      } else {
        throw new Unauthorized()
      }
    } else {
      next();
    }
  }
}
