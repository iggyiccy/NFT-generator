const calculateScore = require("@alheimsins/bigfive-calculate-score");
const result = {
  timeElapsed: -51,
  ip: "127.0.0.1",
  lang: "en",
  test: "50-IPIP-NEO-PI-R",
  totalQuestions: 50,
  answers: [
    {
      domain: "A",
      facet: "1",
      score: "3",
    },
    {
      domain: "A",
      facet: "1",
      score: "3",
    },
    {
      domain: "E",
      facet: "1",
      score: "3",
    },
    {
      domain: "E",
      facet: "2",
      score: "3",
    },
  ],
};

console.log(calculateScore(result));
