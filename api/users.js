import { connectDB } from "./db";
import User from "./models/User";

export default async function handler(req, res) {
  // Connect to MongoDB
  await connectDB();

  if (req.method === "GET") {
    // Get all users
    const users = await User.find();
    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    // Add new user
    const user = await User.create(req.body);
    return res.status(201).json(user);
  }

  // If method is not GET or POST
  res.status(405).json({ message: "Method not allowed" });
}
