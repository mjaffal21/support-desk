const express = require("express");
const router = express.Router();
const {
  GetTickets,
  CreateTicket,
  GetTicket,
  DeleteTicket,
  UpdateTicket,
} = require("../controllers/ticketsController");

const { Protect } = require("../middlewares/authMiddleware");

const noteRouter = require("./noteRoute");
router.use("/:ticketId/notes", noteRouter);

router.route("/").get(Protect, GetTickets).post(Protect, CreateTicket);
router
  .route("/:id")
  .get(Protect, GetTicket)
  .delete(Protect, DeleteTicket)
  .put(Protect, UpdateTicket);

module.exports = router;
