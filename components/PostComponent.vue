<template>
  <div>
    <v-card
      :subtitle="Post!.author.username"
      :text="Post!.message"
      variant="tonal"
    >
      <v-card-actions style="padding-left: 30px">
        <span>{{ Post!.totalLikes }}</span>
        <v-btn @click="toggleLike(Post!.id!)">
          <span v-if="Post!.likes.includes(authId)">Liked</span>
          <span v-else>Like</span>
        </v-btn>
        <v-btn @click="showCommentInput = !showCommentInput"
          >{{ Post!.comments.length }} Comments</v-btn
        >
        <div v-if="Post!.author._id == authId">
          <v-btn @click="deletePost(Post!._id)" icon="mdi-delete"></v-btn>
        </div>
      </v-card-actions>
      <v-row
        v-if="showCommentInput"
        style="max-width: 450px; padding-left: 20px"
      >
        <v-text-field
          label="Enter Comment"
          v-model:model-value="commentMessage"
          variant="underlined"
        ></v-text-field>
        <v-btn
          density="default"
          icon="mdi-send"
          @click="postComment(Post!._id)"
        ></v-btn>
      </v-row>
    </v-card>
    <div v-for="comment in Post!.comments">
      <CommentComponent :comment="comment" :postId="Post!._id" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  Post: Object,
});
const showCommentInput = ref(false);
const commentMessage = ref("");
const authId = useState("authId");
const toggleLike = async (id: String) => {
  const likeResponse = await useFetch("/api/post/like", {
    method: "POST",
    body: { author: authId, id: id },
  });
  if (likeResponse.status.value == "success") window.location.reload();
};

const postComment = async (id: String) => {
  const commentResponse = await useFetch("/api/post/comment", {
    method: "POST",
    body: {
      id: id,
      author: authId,
      message: commentMessage.value,
    },
  });
  if (commentResponse.status.value == "success") window.location.reload();
};

const deletePost = async (postId: String) => {
  const deleteResponse = await useFetch("/api/post/id", {
    method: "DELETE",
    query: {
      id: postId,
    },
  });
  if (deleteResponse.status.value == "success") window.location.reload();
};
</script>
