import pokemon from "pokemontcgsdk";

pokemon.configure({ apiKey: process.env.POKEMON_API_KEY });

pokemon.card.find("swsh7-1").then((card) => {
  console.log(card.images.small); // "Charizard"
});

// const request = require("request");

// const options = {
//   method: "POST",
//   url: "https://api.nftport.xyz/ipfs_upload_metadata",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "ee4f4cfb-1c25-4292-ae00-b1f766208539",
//   },
//   body: {
//     name: "My Art",
//     description: "This is my custom art piece",
//     file_uri: "https://images.pokemontcg.io/xy1/1.png",
//     attributes: [
//       { trait_type: "Base", value: "Blue drawing" },
//       { trait_type: "Style", value: "Lines" },
//       { trait_type: "Level", value: 3, max_value: 10 },
//       { trait_type: "Coolness", value: 1.8, max_value: 2 },
//       { display_type: "boost_number", trait_type: "Spiciness", value: 37 },
//       { display_type: "boost_percentage", trait_type: "Epicness", value: 11 },
//       { display_type: "number", trait_type: "Generation", value: 3 },
//     ],
//   },
//   json: true,
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });
