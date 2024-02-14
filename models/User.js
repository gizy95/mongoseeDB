import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }

});

const User = mongoose.model("User", UserSchema)

export default User;