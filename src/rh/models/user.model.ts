import { Document } from "mongoose";

export interface User extends Document {
    nome: string,
    email: string,
    password: string,
    setor: string,
    firstAcess: boolean,
    dataAdmissao: string,
    telefone: string,
    cpf: string,
    inativo: boolean,
    createdAt: Date;
    updatedAt: Date;
}