const path = require('path')

const buildEslintCommand = filenames =>
  `next lint --max-warnings=0 --dir src --file ${filenames
    .map(f => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '*.{ts,tsx}': [buildEslintCommand],
  '*.{ts,tsx,css,scss}': ["prettier --write 'src/**/*.{ts,tsx,css,scss}'"],
}
