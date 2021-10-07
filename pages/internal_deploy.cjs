// for internal use - run node internal_deploy.js to deploy contract via NFTPort

const request = require("request");

const options = {
  method: "POST",
  url: "https://api.nftport.xyz/contract",
  headers: {
    "Content-Type": "application/json",
    Authorization: "ee4f4cfb-1c25-4292-ae00-b1f766208539",
  },
  body: {
    chain: "polygon",
    contract_name: "Personalised NFT",
    contract_symbol: "POKE",
  },
  json: true,
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
