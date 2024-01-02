const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export type UserType = {
  _id: string;
  name:string;
  email:string;
  passwrod:string;
}

const UserSchema = new Schema({
  email: {
     type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
});

module.exports = mongoose.model("User",UserSchema)