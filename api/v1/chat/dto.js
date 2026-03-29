const sendMessageValidator = (req, res, next) => {
    const { conversationId, message } = req.body;

    if (!conversationId || !message) {
        return res.status(400).json({
            isSuccess: false,
            message: "conversationId and message are required",
        });
    }

    next();
};

const endConversationValidator = (req, res, next) => {
    const { conversationId } = req.body;

    if (!conversationId) {
        return res.status(400).json({
            isSuccess: false,
            message: "conversationId is required",
        });
    }

    next();
};

const confirmSummaryValidator = (req, res, next) => {
    const { conversationId, accepted, feedback } = req.body;

    if (!conversationId || typeof accepted !== "boolean") {
        return res.status(400).json({
            isSuccess: false,
            message: "conversationId and accepted(boolean) are required",
        });
    }

    if (!accepted && !feedback?.trim()) {
        return res.status(400).json({
            isSuccess: false,
            message: "feedback is required when accepted is false",
        });
    }

    next();
};

module.exports = {
    sendMessageValidator,
    endConversationValidator,
    confirmSummaryValidator,
};
