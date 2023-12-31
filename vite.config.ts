import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: "./lib/index.ts",
            name: "Wheater",
            formats: ['umd'],
            fileName: (format) => `index.${format}.js`
        }
    }
})