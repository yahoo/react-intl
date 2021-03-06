import {join, basename} from 'path'
import {outputFileSync, readFileSync} from 'fs-extra'
import minimist from 'minimist'
import {sync as globSync} from 'fast-glob'

function main(args: minimist.ParsedArgs) {
  const {cldrFolder, locales: localesToGen = '', out} = args
  const allFiles = globSync(join(cldrFolder, '*.json'))
  allFiles.sort()
  const locales = localesToGen
    ? localesToGen.split(',')
    : allFiles.map(f => basename(f, '.json'))

  // For test262
  // Only a subset of locales
  const allData = []
  for (const locale of locales) {
    allData.push(readFileSync(join(cldrFolder, `${locale}.json`)))
  }
  outputFileSync(
    out,
    `
// @generated
// @ts-nocheck
// prettier-ignore
import '@formatjs/intl-getcanonicallocales/polyfill';
import './polyfill-force';
if (Intl.NumberFormat && typeof Intl.NumberFormat.__addLocaleData === 'function') {
  Intl.NumberFormat.__addLocaleData(${allData.join(',\n')})
}
`
  )
}

if (require.main === module) {
  main(minimist(process.argv))
}
