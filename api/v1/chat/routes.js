const express = require("express");
const {
    validateLoggedInUserMiddleware,
    validatePatientRole,
} = require("../middlewares");
const {
    startConversationController,
    sendMessageController,
    endConversationController,
    confirmSummaryController,
    getConversationController,
    getPatientConversationsController,
} = require("./controllers");
const {
    sendMessageValidator,
    endConversationValidator,
    confirmSummaryValidator,
} = require("./dto");

const chatRouter = express.Router();

// Start a new conversation
chatRouter.post(
    "/start",
    validateLoggedInUserMiddleware,
    validatePatientRole,
    startConversationController,
);

// Send message and get AI response
chatRouter.post(
    "/message",
    validateLoggedInUserMiddleware,
    validatePatientRole,
    sendMessageValidator,
    sendMessageController,
);

// End conversation and generate summary
chatRouter.post(
    "/end",
    validateLoggedInUserMiddleware,
    validatePatientRole,
    endConversationValidator,
    endConversationController,
);

// Confirm draft summary or request revision
chatRouter.post(
    "/summary-confirm",
    validateLoggedInUserMiddleware,
    validatePatientRole,
    confirmSummaryValidator,
    confirmSummaryController,
);

// Get all patient conversations
chatRouter.get(
    "/",
    validateLoggedInUserMiddleware,
    validatePatientRole,
    getPatientConversationsController,
);

// Get specific conversation history
chatRouter.get(
    "/:conversationId",
    validateLoggedInUserMiddleware,
    validatePatientRole,
    getConversationController,
);

module.exports = { chatRouter };
