const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 MongoDB Connection
mongoose.connect(process.env.mongodb+srv://USERNAME:Raj12345@cluster0.saptg0n.mongodb.net/robo?retryWrites=true&w=majority)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// 🔥 Event Schema
const EventSchema = new mongoose.Schema({
  title: String,
  date: String,
  desc: String,
  link: String,
  image: String
});

const Event = mongoose.model("Event", EventSchema);

// ✅ Add Event
app.post("/add-event", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.json({ message: "Event Saved" });
  } catch (error) {
    console.log("Add Error:", error);
    res.status(500).json({ error: "Failed to save event" });
  }
});

// ✅ Get All Events
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.log("Fetch Error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Delete Event
app.delete("/delete-event/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    console.log("Delete Error:", error);
    res.status(500).json({ error: "Delete failed" });
  }
});

// 🔥 Render Port Fix
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});