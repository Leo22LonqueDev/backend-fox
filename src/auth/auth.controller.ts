import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from 'src/decorators/user.decorator';
import { LoginDto } from './dtos/login.dtos';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Realiza o login' })
    async login(@Body() data: LoginDto) {
        return await this.authService.login(data);
    }

    @Post('logout')
    @ApiOperation({ summary: 'Realiza o logout' })
    async logout() {
        return await this.authService.logout();
    }

    @Post('verify')
    @ApiOperation({ summary: 'Verifica o código de verificação' })
    async verifyCode(@Body() email: string) {
        return await this.authService.verifyCode(email);
    }

    @Get('me')
    @ApiOperation({ summary: 'Retorna o usuário logado' })
    @UseGuards(AuthGuard)
    async me(@User() user) {
        return user
    }
}