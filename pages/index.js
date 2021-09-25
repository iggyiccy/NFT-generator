import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import { hasEthereum } from "../utils/ethereum";
import Greeter from "../src/artifacts/contracts/Greeter.sol/Greeter.json";
import { Form, Field } from "react-final-form";

export default function Home() {
  const [greeting, setGreetingState] = useState("");
  const [newGreeting, setNewGreetingState] = useState("");
  const [newGreetingMessage, setNewGreetingMessageState] = useState("");
  const [connectedWalletAddress, setConnectedWalletAddressState] = useState("");
  const newGreetingInputRef = useRef();
  const onSubmit = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        window.alert(JSON.stringify(values, 0, 2));
        resolve();
      }, 1000);
    });
  };
  const questions = require("./question.json");
  const scale = require("./scale.json");
  const score = require("./score.json");

  // If wallet is already connected...
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

  // Request access to MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // Call smart contract, fetch current value
  async function fetchGreeting() {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`⚠️ MetaMask unavailable`);
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_GREETER_ADDRESS,
      Greeter.abi,
      provider
    );
    try {
      const data = await contract.greet();
      setGreetingState(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Call smart contract, set new value
  async function setGreeting() {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`⚠️ MetaMask unavailable`);
      return;
    }
    if (!newGreeting) {
      setNewGreetingMessageState("Add a new greeting first.");
      return;
    }
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_GREETER_ADDRESS,
      Greeter.abi,
      signer
    );
    const transaction = await contract.setGreeting(newGreeting);
    await transaction.wait();
    setNewGreetingMessageState(
      `Greeting updated to ${newGreeting} from ${greeting}.`
    );
    newGreetingInputRef.current.value = "";
    setNewGreetingState("");
  }

  // function autoCheckRadioButton() {
  //   var radios = document.querySelectorAll("input[type=radio]");
  //   for (var i = 0; i < radios.length; i++) {
  //     var randomNumber = Math.random() * 10 > 5;
  //     radios[i].checked = randomNumber ? true : false;
  //   }
  // }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="max-w-lg mt-36 mx-auto text-center px-4">
      <Head>
        <title>Personalised NFT</title>
        <meta name="description" content="Get Your Personalised NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="space-y-8">
        {!process.env.NEXT_PUBLIC_GREETER_ADDRESS ? (
          <p className="text-md">
            Please add a value to the <pre>NEXT_PUBLIC_GREETER_ADDRESS</pre>{" "}
            environment variable.
          </p>
        ) : (
          <>
            <h1 className="text-4xl font-semibold mb-8">
              🔮 Get Your Personalised NFT
            </h1>
            <div className="h-4">
              {connectedWalletAddress && (
                <p className="text-md">{connectedWalletAddress}</p>
              )}
            </div>
            {/* <button onClick={autoCheckRadioButton}>Auto Fill</button> */}
            <Form
              onSubmit={onSubmit}
              render={({
                handleSubmit,
                values,
                form,
                pristine,
                submitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  {questions.map((question) => (
                    <div key={question.index} className="inline-flex mt-4">
                      {question.question}
                      {score.map((scores) => (
                        <label
                          id="radioButton"
                          key={scores.Score}
                          className="inline-flex items-center ml-4"
                        >
                          <Field
                            name={question.question}
                            component="input"
                            type="radio"
                            className="form-radio h-5 w-5 text-purple-600"
                            value={scores.Score}
                            defaultValue={randomIntFromInterval(1, 5)}
                            // checked
                          />
                          {/* <span className="ml-2 text-gray-700">
                            {scores.Description}
                          </span> */}
                        </label>
                      ))}
                    </div>
                  ))}
                  {/* <pre className="mt-4 mb-4">
                    {JSON.stringify(values, 0, 2)}
                  </pre> */}
                  <div className="mt-8">
                    <button
                      className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl"
                      type="submit"
                      disabled={pristine || submitting}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            />
          </>
        )}
      </main>

      <footer className="mt-20">
        <a
          href="http://rchow.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
        >
          Source code on GitHub
        </a>
      </footer>
    </div>
  );
}
