import mongoose,{Document} from "mongoose";
import bcrypt from "bcrypt";

export interface IEmailVerificationToken extends Document {
    owner: mongoose.Types.ObjectId;
    token: string;
    createAt: Date;
    compareToken(token:string):Promise<boolean>
}



const emailVerificationTokenSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        expires: 3600,
        default: Date.now
    }
});

emailVerificationTokenSchema.pre("save", async function(next) {
    if (this.isModified("token")) {
        this.token = await bcrypt.hash(this.token, 10);
    }
    next();
});


emailVerificationTokenSchema.methods.compareToken = async function(token) {
    console.log("this.token:", this.token);
    if (typeof this.token !== 'string') {
        throw new Error('Token is not a string');
    }

    const result = await bcrypt.compare(token, this.token);
    return result;
};




const EmailVerificationToken = mongoose.model<IEmailVerificationToken>("EmailVerificationToken", emailVerificationTokenSchema);

export default EmailVerificationToken;
