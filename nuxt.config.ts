// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    'nuxt-icon',
    '@ant-design-vue/nuxt',
  ],
  antd: {

  },
  devtools: { enabled: false }
})