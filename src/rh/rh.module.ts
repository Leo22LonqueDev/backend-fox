import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
        AuthModule,
    ],
    controllers: [

    ],
    providers: [
        UserService,
    ],
    exports: [

    ]
})
export class RhModule { }