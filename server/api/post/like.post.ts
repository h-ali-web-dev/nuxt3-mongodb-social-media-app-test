import Post from "~/server/models/post";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log(body);
    let post = await Post.findById(body.id);
    if (post.likes.includes(body.author)) {
      post.likes = post.likes.filter((i: any) => i !== body.author);
    } else {
      post.likes.push(body.author);
    }
    await post.save();
    return { post };
  } catch (e) {
    return createError({
      statusCode: 500,
      statusMessage: "an error occured",
      data: e,
    });
  }
});
