const express = require("express");
const {
    validateLoggedInUserMiddleware,
    validateIsAdminMiddleware,
} = require("../middlewares");
const {
    adminDashboardController,
    reviewDoctorApplicationsController,
    approveDoctorApplicationController,
    rejectDoctorApplicationController,
    getPendingNormalAppointmentsController,
    getEmergencyAppointmentsController,
    approveAppointmentController,
    rejectAppointmentController,
    getTodayQueueController,
    callPatientController,
    setDoctorAvailabilityController,
    getVerifiedDoctorsForAdminController,
    getAvailableSlotsForAdminController,
    offlineBookAppointmentController,
} = require("./controllers");
const { rejectAppointmentValidator, offlineBookValidator } = require("./dto");

const adminsRouter = express.Router();

adminsRouter.get(
    "/dashboard",
    validateLoggedInUserMiddleware,
    validateIsAdminMiddleware,
    adminDashboardController,
);

adminsRouter.get(
    "/doctor-applications",
    validateLoggedInUserMiddleware,
    validateIsAdminMiddleware,
    reviewDoctorApplicationsController,
);

adminsRouter.post(
    "/doctor-applications/:applicationId/approve",
    validateLoggedInUserMiddleware,
    validateIsAdminMiddleware,
    approveDoctorApplicationController,
);

adminsRouter.post(
    "/doctor-applications/:applicationId/reject",
    validateLoggedInUserMiddleware,
    validateIsAdminMiddleware,
    rejectDoctorApplicationController,
);

adminsRouter.get(
    "/appointments/pending",
    validateLoggedInUserMiddleware,
    validateIsAdminMiddleware,
    getPendingNormalAppointmentsController,
);

adminsRouter.get(
    "/appointments/emergency",
    validateLoggedInUserMiddleware,
    validateIsAdminMiddleware,
    getEmergencyAppointmentsController,
);

adminsRouter.post(
    "/appointments/:appointmentId/approve",
    validateLoggedInUserMiddleware,
    validateIsAdminMiddleware,
    approveAppointmentController,
);

adminsRouter.post(
    "/appointments/:appointmentId/reject",
    validateLoggedInUserMiddleware,
    validateIsAdminMiddleware,
    rejectAppointmentValidator,
    rejectAppointmentController,
);

adminsRouter.get(
    "/appointments/today-queue",
    validateLoggedInUserMiddleware,
    validateIsAdminMiddleware,
    getTodayQueueController,
);

adminsRouter.post(
    "/appointments/:appointmentId/call",
    validateLoggedInUserMiddleware,
    validateIsAdminMiddleware,
    callPatientController,
);

adminsRouter.put(
    "/doctors/:doctorId/availability",
    validateLoggedInUserMiddleware,
    validateIsAdminMiddleware,
    setDoctorAvailabilityController,
);

adminsRouter.get(
    "/doctors",
    validateLoggedInUserMiddleware,
    validateIsAdminMiddleware,
    getVerifiedDoctorsForAdminController,
);

adminsRouter.get(
    "/doctors/available-slots",
    validateLoggedInUserMiddleware,
    validateIsAdminMiddleware,
    getAvailableSlotsForAdminController,
);

adminsRouter.post(
    "/appointments/offline-book",
    validateLoggedInUserMiddleware,
    validateIsAdminMiddleware,
    offlineBookValidator,
    offlineBookAppointmentController,
);

module.exports = { adminsRouter };
