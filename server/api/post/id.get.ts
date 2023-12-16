import Post from "~/server/models/post";

export default defineEventHandler(async (event) => {
  try {
    const res = getQuery(event);
    let post = await Post.findById(res.id).populate('author','username');
    post = {...post._doc, likes: post.likes.length }
    return post ;
} catch (e) {
    return createError({ statusCode: 500, statusMessage: "an error occured" })
}
})
