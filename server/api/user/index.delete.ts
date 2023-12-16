import User from "@/server/models/user";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session && process.env.AUTH_BYPASS == "false") {
    throw createError({
      statusMessage: "Unauthenticated for this action",
      statusCode: 403,
    });
  }
  try {
    let user;
    const res = getQuery(event);
    if (res.id) {
      user = await User.findByIdAndDelete(res.id);
    }
    return { statusMessage: "deleted", statusCode: 200 };
  } catch (e) {
    return createError({
      statusCode: 500,
      statusMessage: "an error occured",
      data: e,
    });
  }
});
