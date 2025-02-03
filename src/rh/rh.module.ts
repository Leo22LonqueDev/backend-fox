import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
        AuthModule,
    ],
    controllers: [
        UserController,
    ],
    providers: [
        UserService,
    ],
    exports: [

    ]
})
export class RhModule { }