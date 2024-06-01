import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly userRepository: Repository<UsersModel>,
  ) {}

  async createUser(nickname: string, email: string, password: string) {
    const user = this.userRepository.create({
      nickname,
      email,
      password,
    });

    return this.userRepository.save(user);
  }

  async getUser(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getUsers() {
    return this.userRepository.find();
  }
}
