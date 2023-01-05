import { defineConfig } from 'vite';
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({

  build: {
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, 'src/lib/root.ts'),
      name: 'HorarioG',
      fileName: (format) => `HorarioG.${format}.js`,
      formats: ['es', 'cjs', 'umd', 'iife']
    }
  },
});