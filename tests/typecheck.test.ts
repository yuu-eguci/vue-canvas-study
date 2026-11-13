// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const root = fileURLToPath(new URL('..', import.meta.url))
const vueTsc = fileURLToPath(new URL('../node_modules/vue-tsc/bin/vue-tsc.js', import.meta.url))

describe('型検査', () => {
  // fixture は tsconfig.app.json を継承するため、アプリと同じ設定で検査されます。
  it('SFC の template と script の型の間違いを検出します', () => {
    const result = spawnSync(
      process.execPath,
      [vueTsc, '--noEmit', '--pretty', 'false', '-p', 'tests/fixtures/type-errors/tsconfig.json'],
      { cwd: root, encoding: 'utf8' }
    )
    const errors = result.stdout.split('\n').filter(line => line.includes('error TS'))

    expect(result.status).not.toBe(0)
    expect(errors).toEqual([
      expect.stringMatching(/TypeErrors\.vue\(2,19\): error TS2322: Type 'string' is not assignable to type 'number'/),
      expect.stringMatching(/TypeErrors\.vue\(23,7\): error TS2322: Type 'string' is not assignable to type 'number'/)
    ])
  }, 60_000)
})
