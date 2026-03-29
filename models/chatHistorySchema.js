const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const chatHistorySchema = new Schema(
    {
        conversationId: {
            type: String,
            required: true,
            unique: true,
        },
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
            index: true,
        },
        messages: [
            {
                role: {
                    type: String,
                    enum: ["user", "assistant"],
                    required: true,
                },
                content: {
                    type: String,
                    required: true,
                },
                timestamp: {
                    type: Date,
                    default: Date.now,
                },
                isEmergency: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        summary: {
            symptoms: [
                {
                    type: String,
                },
            ],
            duration: {
                type: String,
                default: "",
            },
            severity: {
                type: Number,
                min: 1,
                max: 10,
                default: null,
            },
            urgencyLevel: {
                type: String,
                enum: ["normal", "urgent", "emergency"],
                default: "normal",
            },
            recommendedSpecialist: {
                type: String,
                default: "",
            },
            detailedSummary: {
                type: String,
                default: "",
            },
            generatedAt: {
                type: Date,
            },
        },
        summaryDraft: {
            symptoms: [{ type: String }],
            duration: { type: String, default: "" },
            severity: { type: Number, min: 1, max: 10, default: null },
            urgencyLevel: {
                type: String,
                enum: ["normal", "urgent", "emergency"],
                default: "normal",
            },
            recommendedSpecialist: { type: String, default: "" },
            detailedSummary: { type: String, default: "" },
            generatedAt: { type: Date },
        },
        summaryRevisions: [
            {
                feedback: { type: String, default: "" },
                revisedAt: { type: Date, default: Date.now },
                draft: {
                    symptoms: [{ type: String }],
                    duration: String,
                    severity: Number,
                    urgencyLevel: String,
                    recommendedSpecialist: String,
                    detailedSummary: String,
                },
            },
        ],
        status: {
            type: String,
            enum: ["active", "draft_ready", "completed", "emergency"],
            default: "active",
        },
        appointmentId: {
            type: Schema.Types.ObjectId,
            ref: "appointment",
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

chatHistorySchema.index({ patientId: 1, createdAt: -1 });
chatHistorySchema.index({ status: 1 });

//method to add message to conversation.
chatHistorySchema.methods.addMessage = function (
    role,
    content,
    isEmergency = false,
) {
    this.messages.push({
        role,
        content,
        timestamp: new Date(),
        isEmergency,
    });
    return this.save();
};

//method to mark as emergency
chatHistorySchema.methods.markAsEmergency = function () {
    this.status = "emergency";
    return this.status;
};

//method to complete conversation with summary
chatHistorySchema.methods.completeSummary = function (summaryData) {
    this.summary = {
        ...summaryData,
        generatedAt: new Date(),
    };
    this.summaryDraft = undefined;
    this.status = "completed";
    return this.save();
};

chatHistorySchema.methods.setSummaryDraft = function (summaryData) {
    this.summaryDraft = {
        ...summaryData,
        generatedAt: new Date(),
    };
    this.status = "draft_ready";
    return this.save();
};

const ChatHistoryModel = model("chatHistory", chatHistorySchema);

module.exports = { ChatHistoryModel };
