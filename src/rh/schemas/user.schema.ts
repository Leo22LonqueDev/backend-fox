import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    setor: { type: String, required: true },
    firstAcess: { type: Boolean, required: false },
    dataAdmissao: { type: String, required: true },
    telefone: { type: String, required: true },
    cpf: { type: String, required: true },
    inativo: { type: Boolean, required: false },
}, {
    timestamps: true
});