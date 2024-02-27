import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import Message from '../model/MesaageModel';
import User from '../model/UserModel';
import Chat from '../model/ChatModel';
import mongoose from 'mongoose';

interface AuthenticatedRequest extends Request {
  user: any; // Define the type of 'user' property as per your actual user model
}

// const sendMessage = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
//   const messageId = new mongoose.Types.ObjectId();
//   const { content, chatId } = req.body;

//   if (!content || !chatId) {
//     console.log("Invalid data is passed");
//     res.status(400).send({
//       msg: "Invalid data passed into request",
//     });
//   }

//   const freshMessage = {
//     sender: req.userId,
//     content: content,
//     chat: chatId,
//   };

//   try {
//     let message = await Message.create(freshMessage);
//     message = await message.populate('sender', 'name img').execPopulate();
//     message = await message.populate('chat').execPopulate();
//     await User.populate(message, {
//       path: "chat.users",
//       select: "name img email",
//     });

//     await Chat.findByIdAndUpdate(req.body.chatId, {
//       $push: { newMessage: messageId },
//     });

//     res.json(message);
//   } catch (error) {
//     console.error(error.message);
//     res.status(400);
//     next(error);
//   }
// });

const sendMessage = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const messageId = new mongoose.Types.ObjectId();
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data is passed");
    res.status(400).send({
      msg: "Invalid data passed into request",
    });
    return; // Make sure to return here to exit the function early
  }

  const freshMessage = {
    sender: req.userId,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(freshMessage);
    message = await message.populate('sender', 'name img').execPopulate();
    message = await message.populate('chat').execPopulate();
    await User.populate(message, {
      path: "chat.users",
      select: "name img email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      $push: { newMessage: messageId },
    });

    res.json(message);
  } catch (error) {
    console.error(error.message);
    res.status(400);
    next(error);
  }
});


const allMessage = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'name email img')
      .populate('chat');
    res.json(messages);
  } catch (error) {
    console.error(error.messages);
    next(error);
  }
});

module.exports = { sendMessage, allMessage };
