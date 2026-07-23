export function getReceiverMessages(messages, receiverId) {

    if (!Array.isArray(messages)) {
        return [];
    }

    return messages.filter(
        (message) =>
            message.senderId === receiverId ||
            message.receiverId === receiverId
    );
}