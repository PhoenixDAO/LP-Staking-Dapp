module.exports = {
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
        config.headers = {
          "X-Frame-Options": "Deny", //scerity header to remove clickjacking
          "X-XSS-Protection": "1",
        };
      return config;
    };
  },
};
