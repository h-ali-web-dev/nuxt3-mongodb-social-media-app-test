import User from "@/server/models/user";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const user = await User.create({
      username: body.username,
      email: body.email,
      password: body.password,
    });
    return { statusMessage:"created", statusCode:200 };
  } catch (e: any) {
    if (e?.code === 11000) {
      return createError({
        statusCode: 500,
        statusMessage: `Fields must be unique`,
        stack: undefined,
        data: e?.keyValue,
      });
    }
    return createError({
      statusCode: 500,
      statusMessage: "an error occured",
      stack: undefined,
      data: e,
    });
  }
});
