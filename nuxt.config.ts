// https://nuxt.com/docs/api/configuration/nuxt-config

require("dotenv").config()

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [ '@nuxt/image','@nuxt/ui'],
  app:{
    head:{
      title:'Dagozilla Parameter Callibrator',
      // link:[
      //   {rel:'icon',type:'image/x-icon',href:'public/favicon.ico'}
      // ]
    }
  },
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
  },
  css:['~/assets/css/cropper.css']
})
