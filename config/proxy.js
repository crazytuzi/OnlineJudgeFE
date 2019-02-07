module.exports = {
  proxyTable: {
        '/api': {
            target: 'http://192.168.1.130:8000',
            changeOrigin: true,           
        }
    }
}
