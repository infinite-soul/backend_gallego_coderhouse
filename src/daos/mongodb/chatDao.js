import { ChatModel } from "./models/chatModel.js";

export const getChat = async () => {
    try {
        return await ChatModel.find();
    } catch (error) {
        console.log(error);
    }
}

export const createChat = async (obj) => {
    try {
        const chat = await ChatModel.create(obj);
        console.log(chat);
        return chat;
    } catch (error) {
        console.log(error);
    }
}
