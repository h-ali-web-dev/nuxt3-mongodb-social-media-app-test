<script lang="ts" setup>
definePageMeta({
  middleware: "guest",
});

const form = ref({
  email: "",
  username: "",
  password: "",
});

const isLoading = ref(false);

async function handleFormSubmit() {
  try {
    isLoading.value = true;
    await useFetch("/api/auth/register", {
      method: "POST",
      body: form.value,
    });

    useRouter().push({
      name: "login",
    });
  } catch (e: any) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div>
    <v-sheet width="300" class="mx-auto">
      <h1>Register</h1>
      <v-form fast-fail @submit.prevent="handleFormSubmit">
        <v-text-field
          v-model="form.email"
          type="email"
          label="Email"
        ></v-text-field>
        <v-text-field
          v-model="form.username"
          type="text"
          label="Username"
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
        ></v-text-field>
        <v-btn type="submit" :disabled="isLoading" block class="mt-2"
          >Register</v-btn
        >
      </v-form>
    </v-sheet>
  </div>
</template>

<style></style>
