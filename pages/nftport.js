// ! 1st Step: Deploy your own contract with Deploy an NFT contract

// const request = require("request");

// const options = {
//   method: "POST",
//   url: "https://api.nftport.xyz/v0/contracts",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "ee4f4cfb-1c25-4292-ae00-b1f766208539",
//   },
//   body: {
//     chain: "polygon",
//     contract_name: "Personalised NFT",
//     contract_symbol: "POKE",
//   },
//   json: true,
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });

// * Get the Transaction Hash

// {
//   response: 'OK',
//   chain: 'polygon',
//   transaction_hash: '0x5e2387740fbc475dede033ecc236397fda5044327ce97d9110f0548b0d25d56b',
//   transaction_external_url: 'https://polygonscan.com/tx/0x5e2387740fbc475dede033ecc236397fda5044327ce97d9110f0548b0d25d56b',
//   contract_name: 'Personalised NFT',
//   contract_symbol: 'POKE',
//   error: null
// }

// * Contract Address

// {
//   "response": "OK",
//   "chain": "polygon",
//   "contract_address": "0xa55AA5d86Be773A17Fa5A1C3E6457062938AaDA8",
//   "transaction_hash": "0x5e2387740fbc475dede033ecc236397fda5044327ce97d9110f0548b0d25d56b",
//   "error": null
// }

// ! 2nd Step: Upload your file to IPFS with Upload a file to IPFS
// ? Using the original image link will be sufficient -> skip

// Format https://images.pokemontcg.io/POKEMON_SET_ID/POKEMON_CARD_ID.png
// e.g https://images.pokemontcg.io/swsh7/1.png

// ! 3rd Step: Create and upload your NFT metadata file with Upload metadata to IPFS
// ? Using the test result decide with personality, then randomly draw card
// ? Checkout scale.js and matchCard.js for more details

// * Result

// {
//   "1 leadership - Make important things happen": "4",
//   "2 organization - Be the financial officer for a company": "4"
// }

// * Map question to index

// import createDecorator from "final-form-calculate";

// const calculator = createDecorator(
//   {
//     field: /leadership/,
//     updates: {
//       leadership: (itemValue, allValues) =>
//         (allValues.leadership || []).reduce((sum, value) => sum + value, 0),
//     },
//   },
//   {
//     field: /organization/,
//     updates: {
//       organization: (itemValue, allValues) =>
//         (allValues.organization || []).reduce((sum, value) => sum + value, 0),
//     },
//   },
//   {
//     field: /altruism/,
//     updates: {
//       altruism: (itemValue, allValues) =>
//         (allValues.altruism || []).reduce((sum, value) => sum + value, 0),
//     },
//   },
//   {
//     field: /creativity/,
//     updates: {
//       creativity: (itemValue, allValues) =>
//         (allValues.creativity || []).reduce((sum, value) => sum + value, 0),
//     },
//   },
//   {
//     field: /analysis/,
//     updates: {
//       analysis: (itemValue, allValues) =>
//         (allValues.analysis || []).reduce((sum, value) => sum + value, 0),
//     },
//   },
//   {
//     field: /production/,
//     updates: {
//       production: (itemValue, allValues) =>
//         (allValues.production || []).reduce((sum, value) => sum + value, 0),
//     },
//   },
//   {
//     field: /adventure/,
//     updates: {
//       adventure: (itemValue, allValues) =>
//         (allValues.adventure || []).reduce((sum, value) => sum + value, 0),
//     },
//   },
//   {
//     field: /erudition/,
//     updates: {
//       erudition: (itemValue, allValues) =>
//         (allValues.erudition || []).reduce((sum, value) => sum + value, 0),
//     },
//   }
// );

// {
//     field: ["leadership", "organization", "altruism", "creativity", "analysis", "production", "adventure", "erudition"],
//     updates: {
//       personality: (ignoredValue, allValues) =>
//         (allValues.day || []).reduce(
//           (sum, value) => sum + Number(value || 0),
//           0
//         ),
//     },
//   }

// * Upload Metadata to IPFS

// const request = require("request");
// const matchCard = require("./result/[cardId]/matchCard");

// const options = {
//   method: "POST",
//   url: "https://api.nftport.xyz/v0/metadata",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "ee4f4cfb-1c25-4292-ae00-b1f766208539",
//   },
//   body: {
//     name: matchCard[1].name,
//     description: "This is your personalised pokemon card",
//     file_url: "https://images.pokemontcg.io/swsh7/1.png",
//     attributes: [
//       { trait_type: "Rarity", value: matchCard[1].Rarity },
//       { trait_type: "Personality", value: matchCard[1].Personality },
//       {
//         display_type: "number",
//         trait_type: "Card Number",
//         value: matchCard[1].No,
//       },
//     ],
//   },
//   json: true,
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
//   const ipfsMetadata = body.metadata_uri;
//   console.log(ipfsMetadata);
// });

// ! 4th Step: Mint NFTs to your contract with Customizable minting

// import { ethers } from "ethers";
// const request = require("request");
// const provider = new ethers.providers.Web3Provider(window.ethereum);
// const signer = provider.getSigner();
// const signerAddress = await signer.getAddress();

// const options = {
//   method: "POST",
//   url: "https://api.nftport.xyz/v0/mints/customizable",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "ee4f4cfb-1c25-4292-ae00-b1f766208539",
//   },
//   body: {
//     chain: "polygon",
//     contract_address: "0xa55AA5d86Be773A17Fa5A1C3E6457062938AaDA8",
//     metadata_uri: ipfsMetadata,
//     mint_to_address: signerAddress,
//   },
//   json: true,
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });
