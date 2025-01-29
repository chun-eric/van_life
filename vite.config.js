import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite"; // This should be reviewed - I'm not certain this is the correct import path for Tailwind 4.0

export default defineConfig({
  plugins: [
    react(), // Make sure React plugin is included
    // tailwindcss(),
  ],
});
