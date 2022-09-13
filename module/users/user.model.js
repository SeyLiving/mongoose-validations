const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String, 
        minLength: [6, "Password is too short"]
    },
},
{
    timestamps: true,
}
);

module.exports = model("User", userSchema);