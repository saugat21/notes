import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        type: String
    }
}, { timestamps: true })

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;