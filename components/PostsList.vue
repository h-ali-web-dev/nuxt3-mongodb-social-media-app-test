<template>
  <div>
    <div v-if="status == 'success'">
      <!-- @vue-ignore -->
      <div v-for="post in data.posts">
        <PostComponent :Post="post" />
      </div>
    </div>
    <div v-if="status == 'error'">Error</div>
  </div>
</template>

<script lang="ts" setup>
const { data, status } = await useFetch("/api/post");
</script>
