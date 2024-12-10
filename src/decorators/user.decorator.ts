import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

export const User = createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    if (request.user) {
        return request.user
    } else {
        throw new NotFoundException('Usuário não encontrado no request. Use o Auth Guard para obter os dados do usuario')
    }
})