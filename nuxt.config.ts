// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['kneekeetah-vue-ui-kit/dist/style.css', "~/style.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt'
  ],
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in', }
  },
})
