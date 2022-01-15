import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

function debugPreprocess() {
  return {
      markup: async ({ content, filename }) => {
        console.log(content)
        return {
          code: content,
          map: ''
        }
      },
      script: () => {},
      style: () => {}
    }
}


function getPages() {
  let pages = ['*', '/test.html']
  return pages
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [ preprocess(), debugPreprocess() ],

  kit: {
    adapter: adapter(),
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    prerender: {
        crawl: true,
        enabled: true,
        entries: getPages(),
    },
  },
}

export default config
