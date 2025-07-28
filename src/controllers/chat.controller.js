import expressAsyncHandler from "express-async-handler";
import { createPersonalMessage, findPersonalMessages } from "../services/chat.service";

const sendPersonalMessage = expressAsyncHandler(async (req, res) => {
  const receiverId = req.params.userId;

  const { content } = req.body;

  if (!content) {
    throw new Error("Message cannot be empty");
  }

  const newMessage = await createPersonalMessage(
    receiverId,
    req.user.id,
    content
  );

  if (!newMessage?.success) {
    throw new Error("Unable to send message");
  }

  res.status(200).json({
    success: true,
    message: "Successfully sent a message",
    message: newMessage?.data,
  });
});

const getPersonalMessage = expressAsyncHandler(async(req, res) => {
    const chatPartnerId = req.params.partnerId;

    const allMessages = await findPersonalMessages(req.user.id, chatPartnerId);

    if(!allMessages.success){
        throw new Error("Unable to find Messages")
    };

    res.status(200).json({
        success: false,
        data: allMessages.data
    })

})

export { sendPersonalMessage, getPersonalMessage };
