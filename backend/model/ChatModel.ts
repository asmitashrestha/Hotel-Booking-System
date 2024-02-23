const mongoose = require('mongoose')

const chatSchema = mongoose.Schema(
    {
        messageName:{type:String, trim:true},
        isGroupChat:{type:Boolean, default:false},
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }],
        newMessage:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
        },
        groupAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",

        }
    },

    {
        timestamps:true,
    }
);

const Chat = mongoose.model("Chat",chatSchema)
export default Chat