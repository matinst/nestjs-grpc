import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserServiceController, CreateUserRequest,UpdateUserRequest, UserServiceControllerMethods, GetUserRequest, PaginationRequest } from '@app/common/types/auth';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  createUser(createUserDto: CreateUserRequest) {
    return this.usersService.create(createUserDto);
  }

  getUsers() {
    return this.usersService.findAll();
  }

  getUser(getUserDto:GetUserRequest) {
    return this.usersService.findOne(getUserDto.id);
  }

  updateUser(updateUserDto: UpdateUserRequest) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  removeUser(getUserDto:GetUserRequest) {
    return this.usersService.remove(getUserDto.id);
  }

  queryUsers(paginationDtoStream: Observable<PaginationRequest>) {
      return this.usersService.queryUsers(paginationDtoStream)
  }
}
