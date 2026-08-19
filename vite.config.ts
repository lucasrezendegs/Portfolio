import fs from 'fs';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig, type Plugin} from 'vite';

const portfolioImages = ['institucional.jpeg', 'rgdec.png', 'taquari.jpeg'];

function copyPortfolioImages(): Plugin {
  return {
    name: 'copy-portfolio-images',
    apply: 'build',
    generateBundle() {
      for (const fileName of portfolioImages) {
        const sourcePath = path.resolve(__dirname, fileName);
        if (!fs.existsSync(sourcePath)) continue;

        this.emitFile({
          type: 'asset',
          fileName,
          source: fs.readFileSync(sourcePath),
        });
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), copyPortfolioImages()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
