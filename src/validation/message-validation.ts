import Joi from "joi";
import {MessageType} from "../types/message.type";


export const validateMessage = async (_message: MessageType) => {
    try {
        const messageSchema = Joi.object({
            text: Joi.string().min(1).max(255).trim().required(),
            conversationId: Joi.string().min(1).max(50).trim().required(),
            receiverId: Joi.string().min(1).max(50).trim()
        });
        return await messageSchema.validateAsync(_message);
    } catch (error) {
        console.log({error_validateMessage: (error as any).message});
        throw error
    }
}