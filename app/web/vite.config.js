// import react from '@vitejs/plugin-react'
// import { defineConfig } from 'vite'
//
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cloudflare } from '@cloudflare/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cloudflare({
      configPath: "../api/wrangler.jsonc",
    }),
  ],
})
