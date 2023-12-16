import User from "@/server/models/user";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const user = await User.find().select("username");
    return { user };
  } catch (e) {
    return createError({ statusCode: 500, statusMessage: "an error occured" });
  }
});
