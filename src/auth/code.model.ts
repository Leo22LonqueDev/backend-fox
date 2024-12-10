import { Document } from "mongoose";

export interface Code extends Document {
    email: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
}