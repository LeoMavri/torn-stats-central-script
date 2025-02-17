import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'TSC Companion - Next',
        description: 'The new and improved TSC Companion. Special thanks to Kwack [2190604]',
        author: 'mavri [2402357]',
        copyright: '2024, diicot.cc',
        icon: 'https://i.imgur.com/8eydsOA.png',
        namespace: 'TSC',
        connect: ['api.torn.com', 'tsc.diicot.cc'],
        match: [
          'https://www.torn.com/profiles.php?*', // User Profile
          'https://www.torn.com/factions.php*', // All factions
          'https://www.torn.com/joblist.php*', // Company Page
          'https://www.torn.com/index.php?page=people*', // Abroad Page
          'https://www.torn.com/pmarket.php', // Points Market
          'https://www.torn.com/loader.php?sid=attack&user2ID=*', // Attack Page
        ],
        updateURL: 'https://github.com/LeoMavri/TSC-Companion/raw/next/dist/tsc-companion.user.js',
        downloadURL:
          'https://github.com/LeoMavri/TSC-Companion/raw/next/dist/tsc-companion.user.js',
        'run-at': 'document-end',
      },
    }),
  ],
  build: {
    minify: true,
    cssMinify: true,
  },
});
