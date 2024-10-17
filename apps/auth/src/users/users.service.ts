import { CreateUserRequest, PaginationRequest, UpdateUserRequest, User, Users } from '@app/common/types/auth';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';
import * as randomHumanNames from 'human-names';
@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users: User[] = [];

  onModuleInit() {
    for (let i = 0; i < 100; i++) {
      this.create({ email: randomHumanNames.maleRandom() + "@gmail.com", password: randomUUID() })
    }
  }

  create(createUserDto: CreateUserRequest): User {
    const user: User = {
      ...createUserDto,
      id: randomUUID(),
      active: false,
      contactInformation: {},
      balance: 0
    }
    this.users.push(user)
    return user
  }

  findAll(): Users {
    return { users: this.users };
  }

  findOne(id: string): User {
    return this.users.find(user => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserRequest): User {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateUserDto
      }
      return this.users[userIndex]
    }
    throw new NotFoundException(`User not found by this id ${id} `);
  }

  remove(id: string) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      return this.users.splice(userIndex)[0];
    }
    throw new NotFoundException(`User not found by this id ${id} `);
  }

  queryUsers(paginationDtoStream: Observable<PaginationRequest>): Observable<Users> {
    const subject = new Subject<Users>();

    const onNext = (paginationDto: PaginationRequest) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        users: this.users.slice(start, start + paginationDto.skip)
      })
    }

    const onComplete = () => subject.complete();

    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete
    })
    return subject.asObservable();
  }
}
