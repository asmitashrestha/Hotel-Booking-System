const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
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

UserSchema.pre("save", async function (next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})



const User = mongoose.model('User', UserSchema);

export default User;
// module.exports = mongoose.model("User",UserSchema)