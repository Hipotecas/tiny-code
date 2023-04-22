
import { EdgeVM } from '@edge-runtime/vm'

import { Environment } from 'vitest'
import { populateGlobal } from 'vitest/environments'
export default <Environment>{
  name: "edge",
  async setup(global) {
    const vm = new EdgeVM({
      extend: (context) => {
        context.navigator = {
          userAgent: 'node'
        }
        context['global'] = context
        context['Buffer'] = Buffer

        context.ArrayBuffer = ArrayBuffer
        context.Uint8Array = Uint8Array
        context.URL = URL
        return context
      }
    })

    const {keys, originals} = populateGlobal(global, vm.context, {bindFunctions: true})
    return  {
      teardown(g) {
        keys.forEach(key => {
          delete g[key]
        })
        originals.forEach((v, k) => (g[k] = v));
      }
    }
  }
}
