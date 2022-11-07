export default function viteRawPlugin (options) {
  return {
    name: 'vite-raw-plugin',
    transform (code, id) {
      if (options.fileRegex.test(id)) {
        const json = JSON.stringify(code)
          .replace(/\u2028/g, '\\u2028')
          .replace(/\u2029/g, '\\u2029')

        return {
          code: `export default ${json}`
        }
      }
    }
  }
}
