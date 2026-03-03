const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 MongoDB Connection (Render Environment Variable use karega)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("Mongo Error:", err));

// ✅ Root route (Cannot GET / fix)
app.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// Event Schema
const EventSchema = new mongoose.Schema({
  title: String,
  date: String,
  desc: String,
  link: String,
  image: String
});

const Event = mongoose.model("Event", EventSchema);

// Add Event
app.post("/add-event", async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json({ message: "Event Saved" });
});

// Get All Events
app.get("/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Delete Event
app.delete("/delete-event/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// 🔥 IMPORTANT for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});