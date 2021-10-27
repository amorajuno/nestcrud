import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private usersList: User[] = [];

  create(user: User) {
    let lastId = 0;
    if (this.usersList.length > 0) {
      lastId = this.usersList[this.usersList.length - 1].id;
    }

    user.id = lastId + 1;
    this.usersList.push(user);
    return `This action adds a new user + ${user}`;
  }

  findAll() {
    return this.usersList;
  }

  findOne(id: number) {
    const user = this.usersList.find((value) => value.id == id);
    return user;
  }

  update(updateUserDto: UpdateUserDto, user: User) {
    const patchUser = this.findOne(user.id);
    if (patchUser) {
      patchUser.email = user.email;
      patchUser.password = user.password;
      patchUser.username = user.username;
    }
    return `This action updates the #${user.id} user to ${patchUser}`;
  }

  remove(id: number) {
    const index = this.usersList.findIndex((value) => value.id === id);
    this.usersList.splice(index, 1);

    return `This action removes the #${id} user`;
  }
}
