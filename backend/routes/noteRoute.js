const express = require("express");
const router = express.Router({ mergeParams: true });
const { GetNotes, AddNote } = require("../controllers/notesController");

const { Protect } = require("../middlewares/authMiddleware");

router.route("/").get(Protect, GetNotes).post(Protect, AddNote);

module.exports = router;
