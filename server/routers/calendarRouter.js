const router = require("express").Router();
const calendarController = require("../controllers/calendarController");
const requireUser = require("../middlewares/requireUser");

router.post("/addEvent", requireUser, calendarController.addEventController);
router.post("/editEvent", requireUser, calendarController.editEventController);
router.delete(
  "/deleteEvent",
  requireUser,
  calendarController.deleteEventController
);
router.get("/events", requireUser, calendarController.calendarDataController);

module.exports = router;
