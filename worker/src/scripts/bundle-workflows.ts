import * as fsp from 'node:fs/promises'
import * as path from 'node:path'

import { bundleWorkflowCode } from '@temporalio/worker'

async function bundle (): Promise<void> {
  console.log(import.meta.dirname)
  console.log(path.resolve(import.meta.dirname, '../workflows'))
  let bundle = await bundleWorkflowCode({
    workflowsPath: path.resolve(import.meta.dirname, '../workflows')
  })

  let codePath = path.resolve(import.meta.dirname, '../../../../dist/workflows.js')

  await fsp.mkdir(path.dirname(codePath), { recursive: true })
  await fsp.writeFile(codePath, bundle.code)
  console.log(`Bundle written to ${codePath}`)
}

bundle()
  .then(() => {
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
