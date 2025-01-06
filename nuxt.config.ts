export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/content", "@nuxt/fonts", "nuxt-icons"],
  compatibilityDate: "2024-11-25",
  fonts: {
    families: [
      {
        name: 'Kumbh Sans', provider: 'google', weights: [400, 700],
      }
    ]
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/_colors.scss" as *;'
        }
      }
    }
  }
})