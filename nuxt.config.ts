// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
    authSecret: process.env.AUTH_SECRET,
  },
  modules: ["@sidebase/nuxt-auth", "vuetify-nuxt-module"],
  auth: { baseURL: process.env.AUTH_ORIGIN, provider: { type: "authjs" } },
});
