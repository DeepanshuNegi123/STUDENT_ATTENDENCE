

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            match: [/^\d{10}$/, "Phone number must be 10 digits"],
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false, // IMPORTANT: password won't be returned by default
        },

        role: {
            type: String,
            enum: ["teacher", "student", "admin"],
            required: true,
            default: "teacher",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);


export default mongoose.model("User", userSchema);
