const eventModel = require("../models/event");

const addEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      organizer,
      price,
      totalSeats,
      image,
      eventType,
    } = req.body;
    const addedEvent = eventModel({
      title,
      description,
      date,
      time,
      location,
      organizer,
      price,
      totalSeats,
      image,
      availableSeats: totalSeats,
      eventType,
      participants: [],
      bookings: [],
    });
    const savedEvent = await addedEvent.save();
    res.status(200).json({
      success: true,
      message: "Event added successfully",
      event: savedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding event",
      error: error.message,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updates = req.body;
    const protectedFields = ["participants", "bookings", "availableSeats"];
    protectedFields.forEach((field) => {
      if (field in updates) {
        delete updates[field];
      }
    });
    const updateEvent = await eventModel.findByIdAndUpdate(
      eventId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updateEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updateEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating event",
      error: error.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedEvent = await eventModel.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      event: deletedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting event",
      error: error.message,
    });
  }
};

module.exports = { addEvent, updateEvent, deleteEvent };
