<template>
  <div style="padding: 10px; display: flex">
    <v-card
      width="400"
      :subtitle="comment?.author?.username"
      :text="comment?.message"
      variant="elevated"
    >
    </v-card>
    <v-btn
      density="default"
      icon="mdi-delete"
      @click="deleteComment(comment?._id, postId!)"
    ></v-btn>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  comment: Object,
  postId: String,
});
const deleteComment = async (id: String, postId: String) => {
  const deleteResponse = await useFetch("/api/post/comment", {
    method: "DELETE",
    query: {
      id: postId,
      commentId: id,
    },
  });
  if (deleteResponse.status.value == "success") window.location.reload();
};
</script>
