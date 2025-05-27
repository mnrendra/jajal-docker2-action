const main = <T>(
  module: T
): T => {
  if (
    typeof module === 'object' &&
    module !== null &&
    !Array.isArray(module) &&
    '__esModule' in module &&
    module.__esModule === true &&
    'default' in module
  ) return module.default as T

  return module
}

export default main
