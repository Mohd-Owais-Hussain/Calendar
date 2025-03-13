const Event = require("../models/Events");
const User = require("../models/User");
const { success, error } = require("../utils/responseWrapper");

const addEventController = async (req, res) => {
  try {
    const { desc, date, calendarMonth, calendarYear } = req.body;
    if (!desc || !date || !calendarMonth || !calendarYear) {
      return res.send(error(400, "Event can't be Empty"));
    }

    const owner = req._id;
    const user = await User.findById(req._id);

    if (!user) {
      return res.send(error(404, "User not found"));
    }

    const event = await Event.create({
      owner,
      desc,
      date,
      month: calendarMonth,
      year: calendarYear,
    });

    user.events.push(event);
    await user.save();

    return res.send(success(200, event));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const editEventController = async (req, res) => {
  try {
    const { _id, desc } = req.body;

    if (!desc) {
      return res.send(error(400, "Event can't be empty"));
    }

    const event = await Event.findById({ _id });

    if (!event) {
      return res.send(error(404, "Event not found"));
    }

    event.desc = desc;
    await event.save();

    return res.send(success(200, event));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const deleteEventController = async (req, res) => {
  try {
    const { _id } = req.query;

    if (!_id) {
      return res.send(error(404, "Event Id not found"));
    }

    const event = await Event.findById({ _id });

    if (!event) {
      return res.send(error(404, "Event not found"));
    }

    const user = await User.findById(event.owner);

    const index = user.events.indexOf(_id);

    await event.deleteOne({ _id });

    user.events.splice(index, 1);

    await user.save();

    return res.send(success(200, event));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const calendarDataController = async (req, res) => {
  try {
    const { year, month } = req.query;

    if (!year || !month) {
      return res.send(404, "Year and Month not found");
    }
    const curUserId = req._id;
    const curUser = await User.findById(curUserId);

    if (!curUser) {
      return res.send(404, "User not found");
    }

    const eventData = await Event.find({
      owner: curUserId,
      month: month,
      year: year,
    });

    return res.send(success(200, eventData));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  addEventController,
  editEventController,
  calendarDataController,
  deleteEventController,
};
