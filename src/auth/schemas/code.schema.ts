import mongoose from "mongoose";

export const CodeSchema = new mongoose.Schema({
    email: { type: String, required: true },
    code: { type: String, required: true },
}, {
    timestamps: true
});