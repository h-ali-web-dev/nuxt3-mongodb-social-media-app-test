import User from "@/server/models/user";

export default defineEventHandler(async (event) => {
  try {
    const res = getQuery(event);
    let user;
    if (res.username) {
      user = await User.findOne({ username: res.username },'username email');
    } else if (res.id) {
      user = await User.findById(res.id,'username email');
    } else {
      throw new Error("missing field");
    }
    return { user };
  } catch (e) {
    return createError({
      statusCode: 500,
      statusMessage: "an error occured",
      data: e,
    });
  }
});
