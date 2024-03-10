const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const ErrorResponse = require("../utils/ErrorResponse");

exports.GetTickets = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorResponse("User not found", 401));
  }
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

exports.GetTicket = asyncHandler(async (req, res, next) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorResponse("User not found", 401));
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    return next(new ErrorResponse("Ticket not found", 404));
  }
  if (ticket.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not Authorized", 401));
  }
  res.status(200).json(ticket);
});

exports.CreateTicket = asyncHandler(async (req, res, next) => {
  const { product, description } = req.body;
  if (!product || !description) {
    return next(new ErrorResponse("Please add a product and description", 400));
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorResponse("User not found", 401));
  }
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });
  res.status(201).json(ticket);
});

exports.DeleteTicket = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorResponse("User not found", 401));
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    return next(new ErrorResponse("Ticket not found", 404));
  }
  if (ticket.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not Authorized", 401));
  }
  await ticket.deleteOne();
  res.status(200).json({ success: true });
});

exports.UpdateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorResponse("User not found", 401));
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    return next(new ErrorResponse("Ticket not found", 404));
  }
  if (ticket.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not Authorized", 401));
  }
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTicket);
});
