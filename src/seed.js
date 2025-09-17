import mongoose from "mongoose";
import fs from "fs";
import Van from "./models/Van.js";
import Host from "./models/Host.js";
import User from "./models/User.js";
import Cart from "./models/Cart.js";
import Booking from "./models/Booking.js";

mongoose.connect("mongodb://localhost:27017/vansApp");

const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

async function seed() {
  try {
    await Van.deleteMany();
    await Host.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();
    await Booking.deleteMany();

    await Van.insertMany(data.vans);
    await Host.insertMany(data.hosts);
    await User.insertMany(data.users);
    await Cart.insertMany(data.cart);
    await Booking.insertMany(data.bookings);

    console.log("✅ Data imported successfully!");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  } finally {
    mongoose.connection.close();
  }
}

seed();
