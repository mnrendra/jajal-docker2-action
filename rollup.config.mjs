import esbuild from 'rollup-plugin-esbuild'

export default [
  //
  {
    external: (id) => !/^[./]/.test(id),
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs'
    },
    plugins: esbuild({ minify: true })
  },
  //
  {
    external: (id) => !/^[./]/.test(id),
    input: 'src/libs/semantic-release-plugin-github-action/index.ts',
    output: {
      file: 'dist/semantic-release-plugin-github-action.js',
      format: 'cjs'
    },
    plugins: esbuild({ minify: true })
  }
]
