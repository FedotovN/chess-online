import type { Unsubscribe } from "firebase/auth";
import { orderBy } from "firebase/firestore"
import type Message from "~/types/chat/Message";
import { type MessageContent } from "~/types/chat/Message";
import { setDocumentEntity, deleteDocument, updateDocumentEntity, subscribeToCollectionChanges  } from "~/api";
class ChatService {
    async create(roomId?: string): Promise<string> {
        const id = roomId || generateHashCode(Math.random().toString());
        const createdAt = new Date();
        await setDocumentEntity(`chats/${id}`, { createdAt, id });
        return id.toString();
    };
    async send(roomId: string, message: Message) {
        return setDocumentEntity(`chats/${roomId}/messages/${message.id}`, message);
    };
    async delete(roomId: string, messageId: string) {
        return deleteDocument(`chats/${roomId}/messages/${messageId}`);
    }
    async modify(roomId: string, messageId: string, content: MessageContent) {
        const updatedAt = new Date();
        await updateDocumentEntity(`chats/${roomId}/messages/${messageId}`, { updatedAt, content });
    }
    listen(roomId: string, callback: (messages: Message[]) => void): Unsubscribe {
        return subscribeToCollectionChanges<Message>(`chats/${roomId}/messages`, callback, orderBy('createdAt'));
    }
}
export default new ChatService();