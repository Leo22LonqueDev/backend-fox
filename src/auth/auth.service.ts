import { Body, HttpException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
// import * as nodemailer from 'nodemailer';
import { LoginDto } from './dtos/login.dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Code } from './models/code.model';
import { Model } from 'mongoose';
import { User } from 'src/rh/models/user.model';
const SECRET = process.env.JWT_SECRET;
// const EMAIL = process.env.EMAIL;
// const PASSWORD = process.env.EMAIL_PASSWORD;

@Injectable()
export class AuthService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Code') private readonly codeModel: Model<Code>
    ) { }

    // async sendVerificationCode(email: string) {
    //     const code = Math.floor(100000 + Math.random() * 900000);
    //     const transporter = nodemailer.createTransport({
    //         host: 'email-ssl.com.br',
    //         port: 465,
    //         secure: true,
    //         auth: {
    //             user: EMAIL,
    //             pass: PASSWORD
    //         }
    //     })
    //     await this.codeModel.deleteMany({ email });
    //     await this.codeModel.create({ email, code: code.toString() });
    //     return await transporter.sendMail({
    //         from: `Equipe de suporte <${EMAIL}>`,
    //         to: email,
    //         subject: 'Código de verificação',
    //         text: `Seu código de verificação é: ${code}`
    //     });
    // }

    async verifyCode(email: {}) {
        const user = await this.userModel.findOne(email);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        await this.codeModel.deleteMany(email
        );
        return jwt.sign({ ...user.toObject(), senha: null, id: user._id }, SECRET, { expiresIn: '12h' });
    }

    async login(loginDto: LoginDto) {
        const user = await this.userModel.findOne({
            email: loginDto.email
        });
        if (!user) {
            throw new HttpException('Usuário não encontrado', 401);
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new HttpException('Senha inválida', 401);
        }
        if (user.inativo) {
            throw new HttpException(`Usuario inativo`, 422)
        }

        const token = jwt.sign({ username: user.nome, email: loginDto.email }, SECRET, { expiresIn: '12h' })

        return { status: 200, message: 'Sucesso ao efetuar login!', token: token, email: user.email };
    }

    async validateUser(token: string) {
        try {
            const decoded: any = jwt.verify(token, SECRET);
            const user = await this.userModel.findById(decoded.id);
            if (!user) {
                throw new HttpException('Invalid token', 401);
            }
            return decoded;
        } catch (error) {
            throw new HttpException('Invalid token', 401);
        }
    }

    async createJwt(user: any) {
        return jwt.sign(user, SECRET)
    }

    async logout() {
        try {
            localStorage.clearCookie('token')
            return { status: 200, message: 'Deslogado com sucesso!' }
        } catch (error) {
            throw new HttpException('Problem to logout', 401);
        }
    }

}