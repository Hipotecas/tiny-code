import * as path from "path";
import {defineConfig} from "vitest/config";

const resolve = (p: string) => path.resolve(__dirname, p)

export default defineConfig({
  test: {
    globals: true,
    alias: {
      vs: resolve('src/vs')
    }
  }
})
