import {join, basename} from 'path'
import {copyFileSync} from 'fs-extra'
import minimist from 'minimist'
import {sync as globSync} from 'fast-glob'

function main(args: minimist.ParsedArgs) {
  const {cldrFolder, locales: localesToGen = '', out} = args
  const allFiles = globSync(join(cldrFolder, '*.json'))
  allFiles.sort()
  const locales = localesToGen
    ? localesToGen.split(',')
    : allFiles.map(f => basename(f, '.json'))

  // Dist all locale files to tests/locale-data
  copyFileSync(join(cldrFolder, `${locales[0]}.json`), out)
}

if (require.main === module) {
  main(minimist(process.argv))
}
