export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/fonts",
    "nuxt-icons",
    "@pinia/nuxt",
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  compatibilityDate: "2024-11-25",
  colorMode: {
    preference: 'light', 
    fallback: 'light', 
    classSuffix: ''
  },

  components: [
    { path: '~/components', pathPrefix: false },
    { path: '~/components/mobile' },
    { path: '~/components/desktop' },
  ],
  tailwindcss: {
    configPath: '~/tailwind.config.js' // Ajoute cette ligne pour spécifier le chemin du fichier de config
  },
  css: [
    '~/assets/css/tailwind.css', // Assure-toi que ce fichier existe
  ],
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