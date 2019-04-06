module.exports = {
  proxyTable: {
        '/api': {
            target: 'http://192.168.200.128:8000',
            changeOrigin: true,           
        }
    }
}
