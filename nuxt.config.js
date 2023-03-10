export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  //ssr: false, //デフォルトでServer-Side Renderingは無効
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'kokyakustaff',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    //※
    //インストールしたnuxtjs/proxyを有効化する事
    '@nuxtjs/proxy',
  ],

  //※
  proxy:{
   '/api/':{
     target:'http://localhost:5000/',
    }
  },

  //※
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios:{
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy:true,
    proxyHeaders:false,
    credentials:false,

  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
