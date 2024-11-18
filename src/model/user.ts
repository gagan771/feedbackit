import mongoose from "mongoose";

export interface Message extends mongoose.Document {

    content: string;
    created: Date;
}
const MessageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

export interface User extends mongoose.Document {

    username : string;
   email: string;
   password: string;
   verifyCode: string;
   verifyCodeExpires: Date;
   isverified: boolean; 
   isAcceptingMessages: boolean;
   messages: Message[];
}
const UserserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, },
    email: { type: String, required: true,  unique: true, trim: true, match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ },
    password: { type: String, required: true, },
    verifyCode: { type: String, required: true },
    verifyCodeExpires: { type: Date, default: Date.now , required: true },
    isverified: { type: Boolean, default: false },
    isAcceptingMessages: { type: Boolean, default: true },
    messages: [MessageSchema]
});


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserserSchema);


export default UserModel;