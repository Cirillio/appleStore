import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  debug: true,
  css: ["~/assets/css/tailwind.css", "@/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    prerender: {
      routes: ["/sitemap.xml"],
    },
  },

  routeRules: {
    "/": { prerender: true },
  },

  modules: [
    "shadcn-nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@formkit/auto-animate",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
  ],

  googleFonts: {
    families: {
      Montserrat: [300, 400, 500, 600, 700],
    },
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./app/components/ui"
     */
    componentDir: "./app/components/ui",
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
