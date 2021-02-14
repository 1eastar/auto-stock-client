const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const sourceDir = path.resolve(rootDir, 'src')

module.exports = {
  Api: path.resolve(sourceDir, 'api'),
  Components: path.resolve(sourceDir, 'components'),
  Constants: path.resolve(sourceDir, 'constants'),
  Containers: path.resolve(sourceDir, 'containers'),
  Elements: path.resolve(sourceDir, 'elements'),
  Models: path.resolve(sourceDir, 'models'),
  Redux: path.resolve(sourceDir, 'redux'),
  Services: path.resolve(sourceDir, 'services'),
  Styles: path.resolve(sourceDir, 'styles'),
  Types: path.resolve(sourceDir, 'types'),
  Utils: path.resolve(sourceDir, 'utils'),
}
