const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");

const User = require("../models/User");
const Note = require("../models/Note");
const Ticket = require("../models/Ticket");

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
exports.GetNotes = asyncHandler(async (req, res, next) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorResponse("User not found", 401));
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    return next(new ErrorResponse("User not Authorized", 401));
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// @desc    Create ticket note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
exports.AddNote = asyncHandler(async (req, res, next) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorResponse("User not found", 401));
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    return next(new ErrorResponse("User not Authorized", 401));
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  });
  res.status(200).json(note);
});
