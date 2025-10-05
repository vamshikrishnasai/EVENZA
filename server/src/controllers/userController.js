const eventModel = require("../models/event");

const getAllEvents = async (req, res) => {
  const eventdata = await eventModel.find({});
  if (!eventdata) {
    return res.status(404).json({ message: "No events found" });
  }
  return res.status(200).json({ message: "Events found", data: eventdata });
};

const getEventById = async (req, res) => {
  const eventId = req.params.eventId;
  const eventdataById = await eventModel.findById(eventId);
  if (!eventId) {
    return res.status(40).json({ message: "Event ID is required" });
  }
  if (!eventdataById) {
    return res.status(404).json({ message: "No events found" });
  }

  return res
    .status(200)
    .json({ message: "Events found", particularData: eventdataById });
};
module.exports = { getAllEvents, getEventById };
