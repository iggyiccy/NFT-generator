module.exports = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    domains: ["images.pokemontcg.io"],
  },
  exportPathMap: function () {
    return {
      "/": { page: "/" },
    };
  },
};
