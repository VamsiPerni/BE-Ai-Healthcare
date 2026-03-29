const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const patientNotificationSchema = new Schema(
    {
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
            index: true,
        },
        appointmentId: {
            type: Schema.Types.ObjectId,
            ref: "appointment",
            required: true,
        },
        type: {
            type: String,
            enum: ["turn_called", "general"],
            default: "general",
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        readAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

patientNotificationSchema.index({ patientId: 1, isRead: 1, createdAt: -1 });

const PatientNotificationModel = model(
    "patientNotification",
    patientNotificationSchema,
);

module.exports = { PatientNotificationModel };
