const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const sourceDir = path.resolve(rootDir, 'src')

module.exports = {
  Api: path.resolve(sourceDir, 'api'),
  Components: path.resolve(sourceDir, 'components'),
  Constants: path.resolve(sourceDir, 'constants'),
  Containers: path.resolve(sourceDir, 'containers'),
  // Decorators: path.resolve(sourceDir, 'decorators'),
  Elements: path.resolve(sourceDir, 'elements'),
  // Features: path.resolve(sourceDir, 'features'),
  Models: path.resolve(sourceDir, 'models'),
  Redux: path.resolve(sourceDir, 'redux'),
  // Routes: path.resolve(sourceDir, 'routes'),
  Services: path.resolve(sourceDir, 'services'),
  Types: path.resolve(sourceDir, 'types'),
  Utils: path.resolve(sourceDir, 'utils'),
}
