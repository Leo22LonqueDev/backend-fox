import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { User } from 'src/decorators/user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    // @Post('login')
    // @ApiOperation({ summary: 'Realiza o login' })
    // async login(@Body() data: LoginDto) {
    //     return await this.authService.login(data);
    // }

    // @Post('verify')
    // @ApiOperation({ summary: 'Verifica o código de verificação' })
    // async verify(@Body() data) {
    //     return await this.authService.verifyCode(data.email, data.code);
    // }

    @Get('me')
    @ApiOperation({ summary: 'Retorna o usuário logado' })
    @UseGuards(AuthGuard)
    async me(@User() user) {
        return user
    }
}