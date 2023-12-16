import Post from "~/server/models/post";

export default defineEventHandler(async (event) => {
  try {
    const res = getQuery(event);
    await Post.findByIdAndDelete(res.id);
    return {statusCode: 200, statusMessage: "deleted"} ;
} catch (e) {
    return createError({ statusCode: 500, statusMessage: "an error occured" })
}
})
