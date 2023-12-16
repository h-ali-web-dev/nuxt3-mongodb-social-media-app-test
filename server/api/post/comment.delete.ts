import Post from "~/server/models/post";

export default defineEventHandler(async (event) => {
  try {
    const body = getQuery(event);
    const post = await Post.findById(body.id);
    post.comments =  post.comments.filter((i:any) => i.id !== body.commentId);
    await post.save()
    return { post };
  } catch (e) {
    return createError({ statusCode: 500, statusMessage: "an error occured", data: e });
  }
});
