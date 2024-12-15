import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../models/user.model";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('user') private readonly userModel: Model<User>
    ) { }

    async findByName(name) {
        return await this.userModel.findOne({ name }).exec();
    }

    async findByNomeCompleto(nomeCompleto) {
        return await this.userModel.findOne({ nomeCompleto }).exec();
    }

    // async updateFerias(id, body) {

    //     const user = await this.userModel.findOne({ _id: id });

    //     let novoVencimentoFerias: { tirouFerias: boolean, anoVencimento: number }[] = []

    //     user.vencimentoFerias.forEach((vencimento) => {
    //         if (vencimento.anoVencimento === body) {
    //             novoVencimentoFerias.push({ tirouFerias: true, anoVencimento: vencimento.anoVencimento })
    //         } else {
    //             novoVencimentoFerias.push(vencimento)
    //         }
    //     })

    //     return await this.userModel.findOneAndUpdate({ _id: id }, {
    //         $set: { vencimentoFerias: novoVencimentoFerias }
    //     }, { new: true })
    // }

    // async updateTirouFeriasToFalse(body: any) {
    //     const user = await this.findByNomeCompleto(body.colaborador);

    //     let newVencimentoFerias: { tirouFerias: boolean, anoVencimento: number }[] = []

    //     const changeStringToNumber = Number(body.vigencia)
    //     user.vencimentoFerias.forEach((vencimento) => {
    //         if (vencimento.anoVencimento === changeStringToNumber) {
    //             newVencimentoFerias.push({ tirouFerias: false, anoVencimento: vencimento.anoVencimento })
    //         } else {
    //             newVencimentoFerias.push(vencimento)
    //         }
    //     })

    //     return await this.userModel.findOneAndUpdate({ _id: user._id }, {
    //         $set: { vencimentoFerias: newVencimentoFerias }
    //     }, { new: true })
    // }

    async findAll() {
        return this.userModel.find()
    }
}