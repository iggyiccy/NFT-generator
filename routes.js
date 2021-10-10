const routes = (module.exports = require("next-routes")());

routes
  .add("index", "/")
  .add("test", "/test")
  .add("result", "/result/:cardId")
  .add("api", "/api");
