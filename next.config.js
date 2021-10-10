module.exports = {
  trailingSlash: true,
  reactStrictMode: true,
  exportPathMap: function () {
    return {
      "/": { page: "/" },
    };
  },
};
