import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({

    login:{
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true
    },
    password: {
        type: String, 
        required: true,
        trim: true
    },

    role: {
        type: String,
        enum: ['admin','user'],
        default: "user",
        required: true
    }
}, {
    timestamps: true
})

// Hook qui sera exécuté avant la création de l'utilisateur
userSchema.pre("save", async function (next) {

 // Si le mot de passe n'a pas été modifié
if(!this.isModified("password")){
    return next();
}

try {
    // Hachage asynchrone du mot de passe
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();

} catch (error) {
    next(error)
}

})

const User = mongoose.model("User", userSchema)

export default User