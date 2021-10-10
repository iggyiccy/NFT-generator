import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { hasEthereum } from "../../../utils/ethereum";
import Head from "next/head";
import { matchCard } from "./matchCard";
import axios from "axios";

const Result = () => {
  const [connectedWalletAddress, setConnectedWalletAddressState] = useState("");
  useEffect(() => {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`⚠️ MetaMask unavailable`);
      return;
    }
    async function setConnectedWalletAddress() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const signerAddress = await signer.getAddress();
        setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
      } catch {
        setConnectedWalletAddressState("No wallet connected");
        return;
      }
    }
    setConnectedWalletAddress();
  }, []);

  const router = useRouter();
  const { cardId } = router.query;
  const cardPersonality = matchCard[cardId - 1].Personality;
  const cardName = matchCard[cardId - 1].Name;
  const cardRarity = matchCard[cardId - 1].Rarity;

  function uploadMetadata(_cardId) {
    // ! Upload Metadata to IPFS
    const options = {
      method: "POST",
      url: "https://api.nftport.xyz/v0/metadata",
      headers: {
        "Content-Type": "application/json",
        Authorization: "ee4f4cfb-1c25-4292-ae00-b1f766208539",
      },
      body: {
        name: matchCard[1].name,
        description: "This is your personalised pokemon card",
        file_url: "https://images.pokemontcg.io/swsh7/" + _cardId + ".png",
        attributes: [
          { trait_type: "Rarity", value: matchCard[_cardId - 1].Rarity },
          {
            trait_type: "Personality",
            value: matchCard[_cardId - 1].Personality,
          },
          {
            display_type: "number",
            trait_type: "Card Number",
            value: matchCard[_cardId - 1].No,
          },
        ],
      },
      json: true,
    };
    axios.request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
      const ipfsMetadata = body.metadata_uri;
      console.log(ipfsMetadata);
    });
    return ipfsMetadata;
  }

  function mintNft(_cardId) {
    // ! Mint NFTs to contract with Customizable Minting
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddress = signer.getAddress();
    const options = {
      method: "POST",
      url: "https://api.nftport.xyz/v0/mints/customizable",
      headers: {
        "Content-Type": "application/json",
        Authorization: "ee4f4cfb-1c25-4292-ae00-b1f766208539",
      },
      body: {
        chain: "polygon",
        contract_address: "0xa55AA5d86Be773A17Fa5A1C3E6457062938AaDA8",
        metadata_uri: uploadMetadata(_cardId),
        mint_to_address: signerAddress,
      },
      json: true,
    };
    axios.request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
      const transactionUrl = body.transaction_external_url;
      console.log(transactionUrl);
    });
    return transactionUrl;
  }

  return (
    <div className="max-w-lg mt-36 mx-auto">
      <Head>
        <title>Personalised NFT</title>
        <meta name="result" content="personality result" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="space-y-48">
        <>
          <h1 className="text-4xl text-center font-black mb-80">
            🔮 Your Personalised NFT
          </h1>
          <div className="p-10 bg-gradient-to-br from-purple-50 to-white shadow-xl rounded-lg my-20">
            <div className="flex justify-center -mt-80">
              <img
                className="w-50 h-70 object-cover rounded-lg "
                src={
                  "https://images.pokemontcg.io/swsh7/" + cardId + "_hires.png"
                }
              />
            </div>
            <div>
              <h2 className="mt-10 text-gray-800 text-4xl font-extrabold">
                {cardName}
              </h2>
              <p className="my-3  text-indigo-400 font-mono font-extralight text-xs">
                Rarity: {cardRarity}
              </p>
              <p className=" text-gray-600">
                The Pokémon Trading Card Game (ポケモンカードゲーム, Pokemon
                Kādo Gēmu, "Pokémon Card Game") is a collectible card game based
                on the Pokémon. Personality associated to this card is "
                {cardPersonality}".
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                href="#"
                onClick={mintNft(cardId)}
                className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-600"
              >
                Mint Now
              </button>
            </div>
          </div>
        </>
      </main>
      <footer className="mt-20 text-center">
        <div className="h-4 text-center font-thin mb-10">
          {connectedWalletAddress && (
            <p className="text-md">{connectedWalletAddress}</p>
          )}
        </div>
        <a
          href="http://rchow.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-800"
        >
          Source code on GitHub
        </a>
      </footer>
    </div>
  );
};

export default Result;
