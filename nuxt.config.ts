import path from 'path';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['kneekeetah-vue-ui-kit/dist/style.css', '~/style.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  modules: ['@pinia/nuxt'],
  srcDir: 'src/',
  app: {
    head: {
      title: 'NuxtChess',
      link: [
        {
          crossorigin: 'anonymous',
          referrerpolicy: 'no-referrer',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
          rel: 'stylesheet',
          integrity: 'sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=='
        }
      ]
    }
  },
  vite: {
    resolve: {
      alias: {
        '@public': path.resolve('./public/')
      }
    }
  }
});
