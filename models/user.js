import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
    if(!user.isModified('password')) return next()
  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password.toString(), salt);
    next();
  } catch (error) {
    console.log(error,"hashPassword");
  }
});

userSchema.methods.verifyPass = async function(clientPass){
    return await bcryptjs.compare(clientPass, this.password)
}

export const User = mongoose.model("User", userSchema);
