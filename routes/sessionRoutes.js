const express = require("express");
const {
  createSession,
  getAllSessions,
  getSpecificSession,
  updateSpecificSession,
  deleteSpecificSession,
  getAllSessionForSpecificDoctor,
  getAllSessionForSpecificDoctorByStatus,
  getAllSessionForSpecificParentByStatus,
  getAllSessionForSpecificParent,
  addCommentToSpecificSession,
  getAllSessionsForDoctor,
  getAllSessionsFotDoctorByStatus,
} = require("../services/sessionServices");

const {
  createSessionValidator,
  deleteSessionValidator,
  getSessionValidator,
  updateSessionValidator,
} = require("../utils/validator/sessionValidator");

const AuthServices = require("../services/authServices");
const router = express.Router();

// Create and get all sessions
router
  .route("/")
  .post(
    AuthServices.protectForDoctor,
    AuthServices.allowedToForDoctor("doctor"),
    createSessionValidator,
    createSession
  )
  .get(getAllSessions);

// Specific routes FIRST
router
  .route("/ForParent/:doctorId")
  .get(
    AuthServices.protectForParent,
    AuthServices.allowedToParent("parent"),
    getAllSessionForSpecificParent
  );

router
  .route("/ForParent/:doctorId/status/:status")
  .get(
    AuthServices.protectForParent,
    AuthServices.allowedToParent("parent"),
    getAllSessionForSpecificParentByStatus
  );

router
  .route("/ForDoctor/:parentId")
  .get(
    AuthServices.protectForDoctor,
    AuthServices.allowedToForDoctor("doctor"),
    getAllSessionForSpecificDoctor
  );

router
  .route("/ForDoctor/:parentId/status/:status")
  .get(
    AuthServices.protectForDoctor,
    AuthServices.allowedToForDoctor("doctor"),
    getAllSessionForSpecificDoctorByStatus
  );

router
  .route("/allSessionsForSpecificDoctors")
  .get(
    AuthServices.protectForDoctor,
    AuthServices.allowedToForDoctor("doctor"),
    getAllSessionsForDoctor
  );

router
  .route("/allSessionsForDoctor/status/:status")
  .get(
    AuthServices.protectForDoctor,
    AuthServices.allowedToForDoctor("doctor"),
    getAllSessionsFotDoctorByStatus
  );

// Add comment
router
  .route("/:sessionId/comments")
  .post(
    AuthServices.protectForDoctor,
    AuthServices.allowedToForDoctor("doctor"),
    addCommentToSpecificSession
  );

// Dynamic :id route LAST
router
  .route("/:id")
  .get(getSessionValidator, getSpecificSession)
  .put(
    AuthServices.protectForDoctor,
    AuthServices.allowedToForDoctor("doctor"),
    updateSessionValidator,
    updateSpecificSession
  )
  .delete(
    AuthServices.protectForDoctor,
    AuthServices.allowedToForDoctor("doctor"),
    deleteSessionValidator,
    deleteSpecificSession
  );

module.exports = router;
