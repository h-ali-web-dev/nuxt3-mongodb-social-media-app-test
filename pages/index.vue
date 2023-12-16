<template>
  <div>
    <v-row justify="space-between">
      <h5>Logged in as: {{ data?.user?.username }}</h5>
      <v-btn @click="handleLogout">Logout</v-btn>
    </v-row>
    <CreatePostComponent />
    <PostsList />
    <!-- <h1>{{ data }}</h1> -->
  </div>
</template>
<script setup lang="ts">
const { data, signOut } = useAuth();
//@ts-ignore
const authId = useState("authId", () => data.value?.user!._id);

async function handleLogout() {
  await signOut();
}
definePageMeta({
  middleware: "auth",
});
</script>

<style scoped>
div {
  margin: 20px;
  margin-right: auto;
  margin-left: auto;
  max-width: 500px;
}
</style>
