import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  name: {
    type: String, required: true
  },
  email: {
    type: String, required: true, unique: true
  },
  username: { 
    type: String, required: true, unique: true
  },
  password: {
    type: String , required: true
  },
  profilePicture: {
    type: String
  },
  coverPicture: {
    type: String
  },
  paymentId: {
    type: String
  },
  paymentSecret: {
    type: String
  },
  paymentSecretApi: {
    type: String
  }
  
})

if (process.env.NODE_ENV !== "production") {
    delete mongoose.models.User;
}


export default mongoose.models.User || mongoose.model('User', userSchema)