export enum DeliveryStatus {
    READ,
    SENDED,
    SENDING
}
export type MessageContent = string;
export default interface Message {
    id: string,
    createdAt: Date,
    updatedAt?: Date,
    createdByUid: string
    deliveryStatus: DeliveryStatus
    content: MessageContent,
}