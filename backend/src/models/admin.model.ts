import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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