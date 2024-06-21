import { Injectable } from '@nestjs/common';
import { ROLE, USER, DATA_USERS } from 'src/common/data';

@Injectable()
export class UserService {
  findUserByRole(role: ROLE): USER {
    return DATA_USERS.find((user) => user.role === role);
  }

  findUserById(id: number): USER {
    return DATA_USERS.find((user) => user.id === +id);
  }
}
