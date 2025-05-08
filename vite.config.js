import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from "@tailwindcss/vite"; // This should be reviewed - I'm not certain this is the correct import path for Tailwind 4.0

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()]
    // Make sure environment variables are exposed
    // define: {
    //   'process.env': env
    // }
  }
})
