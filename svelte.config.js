import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import makeAttractionsImporter from 'attractions/importer.js';
import path from 'path';
import { URL } from 'url';

const __dirname = new URL('.', import.meta.url).pathname;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			importer: makeAttractionsImporter({
				themeFile: path.join(__dirname, 'css/theme.scss')
			}),
			includePaths: [path.join(__dirname, 'css')]
		}
	})
	,

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		// target: '#svelte'
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null
		})
	}
};

export default config;
