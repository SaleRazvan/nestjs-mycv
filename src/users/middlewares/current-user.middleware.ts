import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const { userId } = req.session ?? {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      // @ts-ignore
      req.currentUser = user;
    }

    next();
  }
}
