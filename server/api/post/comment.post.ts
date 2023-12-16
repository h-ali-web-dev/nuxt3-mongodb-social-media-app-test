import Post from "~/server/models/post";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const post = await Post.findById(body.id);
    post.comments.push({ author: body.author, message: body.message });
    await post.save()
    return { post };
  } catch (e) {
    return createError({ statusCode: 500, statusMessage: "an error occured", data: e });
  }
});
