import { getServerSession } from "#auth";
export default eventHandler(async (event) => {
  const session = await getServerSession(event);
  if (process.env.AUTH_BYPASS == "false" && event.path.includes("/api/post")) {
    if (!session) {
      throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
    }
  }
});
