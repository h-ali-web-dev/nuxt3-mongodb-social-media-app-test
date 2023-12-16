import mongoose from "mongoose";
import { Nitro } from "nitropack";

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();
  try {
    await mongoose
      .connect(process.env.MONGO_URI!)
      .then(() => console.log(`Connected to DB`))
      .catch((err) => console.log(err));
  } catch (e) {
    console.log("There was an error connecting to DB");
    console.log(e);
  }
};
