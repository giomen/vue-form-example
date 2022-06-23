module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ]
}
