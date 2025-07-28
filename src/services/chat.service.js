import db from "../db/db.js";

const createPersonalMessage = async (receiverId, senderId, content) => {
    try {
        const message = await db.personalMessage.create({
            data: {
                senderId,
                receiverId,
                content
            }
        })

        if(!message) {
            return {
                success: false,
            }
        } 
 
        return {
            success: true,
            data: message
        }
    } catch (error) {
        return {
            success: false,
            error
        }
    }
}

const findPersonalMessages = async (userId, partnerId) => {
    try {
        const messages = await db.personalMessage.findMany({
            where: {
                OR: [
                    {
                        senderId: userId,
                        receiverId: partnerId
                    },
                    {
                        receiverId: userId,
                        senderId: partnerId
                    }
                ]
            }
        });

        if(messages.length === 0) {
            return {
                success: false,
                data: null,
                error: null
            }
        }

        return {
            success: true,
            data: messages,
            error: null
        }
        
    } catch (error) {
        return {
            success: false,
            data: null,
            error
        }
    }
}


export {
    createPersonalMessage,
    findPersonalMessages
}