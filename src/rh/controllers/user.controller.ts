import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { UserService } from "../services/user.service";

@Controller('users')
@ApiTags('users')
// @UseGuards(AuthGuard)
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Get()
    async findAll() {
        return await this.userService.findAll()
    }
}