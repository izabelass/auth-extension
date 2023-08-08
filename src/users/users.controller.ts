import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { Role } from './enums/role.enum';
// import { Permissions } from 'src/iam/authorization/decorators/permissions.decorator';
// import { Permission } from 'src/iam/authorization/permissions.type';
import { Policies } from 'src/iam/authorization/decorators/policies.decorator';
import { FrameworkContributorPolicy } from 'src/iam/authorization/policies/framework-contributor.policy';
import { OnlyAdminPolicy } from 'src/iam/authorization/policies/only-admin.policy';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Roles(Role.Admin)
  // @Permissions(Permission.CreateCoffee)
  @Policies(
    new FrameworkContributorPolicy(),
    /** new MinAgePolicy(18), new OnlyAdminPolicy() */
  )
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Policies(new OnlyAdminPolicy())
  @Get()
  findAll(@ActiveUser() user: ActiveUserData) {
    console.log(user);
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
