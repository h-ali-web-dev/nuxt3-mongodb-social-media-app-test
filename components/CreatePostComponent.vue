<template>
  <div>Create Post</div>
  <v-text-field
    label="Enter Message"
    variant="solo-filled"
    v-model:model-value="message"
  ></v-text-field>
  <v-row justify="end" style="margin-bottom: 20px">
    <v-btn @click="sendPost">Post</v-btn>
  </v-row>
</template>

<script setup>
const message = ref("");
const authId = useState("authId");
const sendPost = async () => {
  const postResponse = await useFetch("/api/post", {
    method: "Post",
    body: {
      author: authId,
      message: message.value,
    },
  });
  if (postResponse.status.value == "success") window.location.reload();
};
</script>
