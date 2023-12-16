import Post from "~/server/models/post";
import User from "~/server/models/user";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const author = await User.findById(body.author);
    const post = await Post.create({
        message: body.message,
        author: author._id,
    });
    return { post };
} catch (e) {
    return createError({ statusCode: 500, statusMessage: "an error occured" })
}
})
