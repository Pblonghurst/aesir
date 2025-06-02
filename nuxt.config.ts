// https://nuxt.com/docs/api/configuration/nuxt-config
// imports
import tailwindcss from '@tailwindcss/vite';

// config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/supabase',
    'shadcn-nuxt',
  ],

  // shadcn
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  components: [
    {
      path: '~/components', // auto-import any .vue under components/ui
      extensions: ['vue'],
      pathPrefix: false, // so that nested folders don’t become part of the name
    },
  ],

  // Runtime config for environment variables
  runtimeConfig: {
    // Server-side environment variables
    database: {
      url: process.env.DATABASE_URL,
    },
  },

  // Supabase
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/dashboard',
      exclude: ['/'],
    },
  },
});
