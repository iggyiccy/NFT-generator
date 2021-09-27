import pokemon from "pokemontcgsdk";

export default function handler(req, res) {
  pokemon.configure({ apiKey: process.env.POKEMON_API_KEY });
  const { cardId } = req.query;
  const pokemonCard = pokemon.card
    .find("base1-4") // "CardID"
    .then((card) => {
      card.name === parseInt(cardId); // "Charizard"
    });
  res.status(200).json(pokemonCard);
}
