module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    'lodash',
    ['transform-imports', {
      'core-decorators': {
        transform: 'core-decorators/lib/${member}',
        preventFullImport: true,
      },
    }],
    ['@babel/plugin-transform-runtime', { corejs: 3, "regenerator": true }],
  ]
}
