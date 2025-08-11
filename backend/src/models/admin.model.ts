import mongoose from "mongoose";
import { required } from "zod/mini";

const adminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    hash : {
        type : String,
        required : true
    }
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;