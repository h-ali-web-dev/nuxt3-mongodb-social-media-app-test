<script lang="ts" setup>
definePageMeta({
  middleware: "guest",
});

const form = ref({
  username: "",
  password: "",
});

const { signIn, status } = useAuth();

async function handleLogin() {
  try {
    await signIn("credentials", form.value);
    useRouter().push({
      name: "index",
    });
  } catch (e) {}
}
</script>
<template>
  <div>
    <v-sheet width="300" class="mx-auto">
      <h1>Login</h1>
      <v-form fast-fail @submit.prevent="handleLogin">
        <v-text-field v-model="form.username" label="Username"></v-text-field>
        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
        ></v-text-field>
        <v-btn type="submit" block class="mt-2">Submit</v-btn>
        <v-btn block class="mt-5" @click="navigateTo('/signup')">Sign Up</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>
