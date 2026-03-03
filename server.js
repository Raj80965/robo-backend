const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://rajgururaj1765_db_user:r1a7j0g6u0r5u@cluster0.saptg0n.mongodb.net/robo?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));

const EventSchema = new mongoose.Schema({
  title: String,
  date: String,
  desc: String,
  link: String,
  image: String
});

const Event = mongoose.model("Event", EventSchema);

app.post("/add-event", async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json({ message: "Event Saved" });
});

app.get("/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.delete("/delete-event/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});