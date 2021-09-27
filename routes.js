const routes = (module.exports = require("next-routes")());

routes
  .add("index", "/")
  .add("test", "/test")
  .add("showResult", "/result/:id")
  .add("api", "/api");
