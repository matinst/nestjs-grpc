import { CreateUserRequest, PaginationRequest, USER_SERVICE_NAME, UpdateUserRequest, UserServiceClient } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private userService: UserServiceClient;
  constructor(
    @Inject(AUTH_SERVICE) private client: ClientGrpc
  ) { }

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME)
  }
  create(createUserDto: CreateUserRequest) {
    return this.userService.createUser(createUserDto);
  }

  findAll() {
    return this.userService.getUsers({});
  }

  findOne(id: string) {
    return this.userService.getUser({ id });
  }

  update(id: string, updateUserDto: UpdateUserRequest) {
    return this.userService.updateUser({ id, ...updateUserDto });
  }

  remove(id: string) {
    return this.userService.removeUser({ id });
  }

  emailUsers() {
    const users$ = new ReplaySubject<PaginationRequest>();

    users$.next({ page: 0, skip:25 });
    users$.next({ page: 1, skip:25 });
    users$.next({ page: 2, skip:25 });
    users$.next({ page: 3, skip:25 });

    users$.complete();

    let chunkNumber = 1;

    this.userService.queryUsers(users$).subscribe(users => {
      console.log('Chunk :', chunkNumber, users);
      chunkNumber += 1;
    })
  }
}
