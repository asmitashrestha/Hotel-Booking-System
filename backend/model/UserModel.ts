const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export type UserType = {
  _id: string;
  name: string;
  email: string;
  passwrod: string;
  isVerified: boolean;
  role:'admin'|'user';
};

// const UserSchema = new Schema({
//   email: {
//      type: String,
//       required: true,
//       unique: true
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ['user', 'admin'],
//       default: 'user',
//     },

// },{ timestamps: true });

// UserSchema.pre("save", async function (next){
//   if(this.isModified('password')){
//     this.password = await bcrypt.hash(this.password, 8)
//   }
//   next()
// })

// const User = mongoose.model('User', UserSchema);

// export default User;
// // module.exports = mongoose.model("User",UserSchema)

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: { type: String, required: false },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  role:{
    type:String,
    requierd:true,
    default:'user',
    enum:['admin','user']
  }
},
{
    timestamps: true
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

const User = mongoose.model("User", userSchema);
export default User;
