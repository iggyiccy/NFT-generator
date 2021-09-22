const getResult = require("@alheimsins/b5-result-text");
const scores = {
  A: {
    score: 6,
    count: 2,
    result: "neutral",
    facet: {
      1: {
        score: 6,
        count: 2,
        result: "neutral",
      },
    },
  },
  E: {
    score: 6,
    count: 2,
    result: "neutral",
    facet: {
      1: {
        score: 3,
        count: 1,
        result: "neutral",
      },
      2: {
        score: 3,
        count: 1,
        result: "neutral",
      },
    },
  },
};

const results = getResult({ scores: scores, lang: "en" });

console.log(JSON.stringify(results, null, 2));
