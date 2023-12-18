import { createChat, getChat } from "../daos/mongodb/chatDao.js";

export const getChatService = async () => {
    try {
        return await getChat();
    } catch (error) {
        console.log(error);
    }
}

export const createService = async (obj) => {
    try {
        const message = {
            user: obj.username,
            message: obj.message
        };
        return await createChat(message);
    } catch (error) {
        console.log(error);
    }
}
