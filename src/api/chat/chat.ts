import {http} from "../../utils/http";

export class Chat {

    static async fetchMessagesByConversationBeSkipped(messages: { conversationId: string, skipMessages: string | number }) {
        try {
            return await http.get(`message/${messages.conversationId}/skip/${messages.skipMessages}`);
        } catch (error) {
            console.log({error_fetchMessagesByConversationBeSkipped: error})
            throw  error;
        }
    }
}