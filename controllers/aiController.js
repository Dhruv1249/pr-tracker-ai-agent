import chat from "../ai/chat.js";

const aiController = {
    chat: async (req, res) => {
        const { content } = req.body;
        if (!content) return res.status(400).json({ error: "Content is required" });

        const response = await chat(content);
        res.json({ message: response });
    },
};
 
export default aiController;

