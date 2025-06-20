const asyncHandler = require("express-async-handler");

const Session = require("../models/SessionModel");
const Doctor = require("../models/doctorModel");
const factory = require("./handlersFactory");
const ApiFeatures = require("../utils/apiFeatures");
const ApiError = require("../utils/apiError");

/**
 * Create Session
 * @router Post /api/v1/Session
 * @access private/Session
 */

exports.createSession = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.doctor._id);
  if (!doctor) {
    return next(
      new ApiError(`There is no doctor for this id ${req.doctor._id}`)
    );
  }

  const session = await Session.create({
    doctorId: req.doctor._id,
    parentId: req.body.parentId,
    session_number: req.body.session_number,
    session_date: req.body.session_date,
    statusOfSession: req.body.statusOfSession,
    comments: req.body.comments,
  });

  res.status(200).json({ data: session });
});

/**
 * Get All Session
 * @router Post /api/v1/Session
 * @access private/Session
 */

exports.getAllSessions = factory.getAll(Session);
/**
 * Get Specific Session
 * @router Post /api/v1/Session/:id
 * @access private/Session
 */

exports.getSpecificSession = factory.getOne(Session);
/**
 * Update Specific Session
 * @router Put /api/v1/Session/:id
 * @access private/Session
 */

exports.updateSpecificSession = factory.updateOne(Session);

/**
 * Delete Specific Session
 * @router delete /api/v1/Session/:id
 * @access private/Session
 */

exports.deleteSpecificSession = factory.deleteOne(Session);

//**-------------------------------------------------------------- */

//* For Parent

exports.getAllSessionForSpecificParent = asyncHandler(
  async (req, res, next) => {
    const { doctorId } = req.params;

    const session = await Session.find({
      parentId: req.parent._id,
      doctorId: doctorId,
    });

    if (!session) {
      return next(new ApiError(`there is no session for this id`));
    }

    res.status(200).json({ data: session });
  }
);

exports.getAllSessionForSpecificParentByStatus = asyncHandler(
  async (req, res, next) => {
    const { status, doctorId } = req.params;
    const session = await Session.find({
      parentId: req.parent._id,
      doctorId: doctorId,
      statusOfSession: status,
    });

    if (!session) {
      return next(new ApiError(`there is no session for this id..`));
    }

    res.status(200).json({ data: session });
  }
);

//*------------------------------------------------------------------------------------- */

//* For Doctor

exports.getAllSessionForSpecificDoctor = asyncHandler(
  async (req, res, next) => {
    const { parentId } = req.params;
    const session = await Session.find({
      parentId: parentId,
      doctorId: req.doctor._id,
    });

    if (!session) {
      return next(new ApiError(`there is no session for this id`));
    }

    res.status(200).json({ data: session });
  }
);

exports.getAllSessionsForDoctor = asyncHandler(async (req, res, next) => {
  const session = await Session.find({
    doctorId: req.doctor._id,
  });

  if (!session) {
    return next(new ApiError(`there is no session for this id`));
  }

  res.status(200).json({ data: session });
});

exports.getAllSessionsFotDoctorByStatus = asyncHandler(
  async (req, res, next) => {
    const { status } = req.params;
    const session = await Session.find({
      doctorId: req.doctor._id,
      statusOfSession: status,
    });

    if (!session) {
      return next(new ApiError(`there is no session for this id..`));
    }

    res.status(200).json({ data: session });
  }
);

exports.getAllSessionForSpecificDoctorByStatus = asyncHandler(
  async (req, res, next) => {
    const { status, parentId } = req.params;
    const session = await Session.find({
      parentId: parentId,
      doctorId: req.doctor._id,
      statusOfSession: status,
    });

    if (!session) {
      return next(new ApiError(`there is no session for this id..`));
    }

    res.status(200).json({ data: session });
  }
);

//* Add Comment to Session
exports.addCommentToSpecificSession = asyncHandler(async (req, res, next) => {
  const comment = req.body.comment;
  const { sessionId } = req.params;
  const session = await Session.findById(sessionId);
  if (!session) {
    return next(new ApiError(`There is no Session for this id :${sessionId}`));
  }
  session.comments.push(comment);
  await session.save();

  res.status(200).json({ data: session });
});
