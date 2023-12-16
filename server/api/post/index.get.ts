import Post from "~/server/models/post";

export default defineEventHandler(async (event) => {
  try {
    let posts = await Post.find()
      .populate("author", "username")
      .populate("comments.author", "username")
      .sort("-createdAt");
    return { posts };
  } catch (e) {
    return createError({
      statusCode: 500,
      statusMessage: "an error occured",
      data: e,
    });
  }
});
