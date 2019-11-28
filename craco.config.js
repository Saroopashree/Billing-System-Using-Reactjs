module.exports = {
  webpack: {
    configure: {
      target: 'electron-renderer',
      node: {
        __filename: true,
        __dirname: true
      },
    }
  }
}