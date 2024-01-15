// https://nuxt.com/docs/api/configuration/nuxt-config

require("dotenv").config()

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [ '@nuxt/image','@nuxt/ui',
    // '@nuxtjs/axios'
  ],
  image: {
    inject:true
  },
  colorMode: {
    preference:'light'
  },
  runtimeConfig: {
    public: {
      robotIP: process.env.VUE_APP_ROBOT
    }
  }
})