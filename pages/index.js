import Head from "next/head";
import Link from "next/link";
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

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="max-w-lg mt-36 mx-auto">
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
            <h1 className="text-4xl text-center font-black mb-8">
              🔮 Your Personalised NFT
            </h1>
            <div className="h-4 text-center font-thin">
              {connectedWalletAddress && (
                <p className="text-md">{connectedWalletAddress}</p>
              )}
            </div>
            <Form
              onSubmit={onSubmit}
              render={({
                handleSubmit,
                values,
                form,
                pristine,
                submitting,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className=" bg-white shadow rounded-lg p-10"
                >
                  <div className="grid gap-3 grid-cols-5 mb-10">
                    <img
                      src="/angry-1991061.svg"
                      className="h-8 w-8"
                      alt="1.angry"
                    />
                    <img
                      src="/sad-1991063.svg"
                      className="h-8 w-8"
                      alt="2.sad"
                    />
                    <img
                      src="/care-1991058.svg"
                      className="h-8 w-8"
                      alt="3.care"
                    />
                    <img
                      src="/like-1991059.svg"
                      className="h-8 w-8"
                      alt="4.like"
                    />
                    <img
                      src="/love-1991064.svg"
                      className="h-8 w-8"
                      alt="5.love"
                    />
                  </div>
                  {questions.map((question) => (
                    <div key={question.index} className="block mt-4">
                      <label className="mt-3 inline-block text-left font-semibold text-lg">
                        {question.question}
                      </label>
                      <div className="mt-3 grid gap-6 grid-cols-5">
                        <label
                          id="radioButton"
                          className="inline-flex items-center"
                        >
                          <Field
                            id={question.question}
                            name={question.question}
                            component="input"
                            type="radio"
                            className="form-radio h-5 w-5 text-purple-600 hover:text-purple-400"
                            value="1"
                          />
                        </label>
                        <label
                          id="radioButton"
                          className="inline-flex items-center"
                        >
                          <Field
                            id={question.question}
                            name={question.question}
                            component="input"
                            type="radio"
                            className="form-radio h-5 w-5 text-purple-600 hover:text-purple-400"
                            value="2"
                          />
                        </label>
                        <label
                          id="radioButton"
                          className="inline-flex items-center"
                        >
                          <Field
                            id={question.question}
                            name={question.question}
                            component="input"
                            type="radio"
                            className="form-radio h-5 w-5 text-purple-600 hover:text-purple-400"
                            value="3"
                          />
                        </label>
                        <label
                          id="radioButton"
                          className="inline-flex items-center"
                        >
                          <Field
                            id={question.question}
                            name={question.question}
                            component="input"
                            type="radio"
                            className="form-radio h-5 w-5 text-purple-600 hover:text-purple-400"
                            value="4"
                          />
                        </label>
                        <label
                          id="radioButton"
                          className="inline-flex items-center"
                        >
                          <Field
                            id={question.question}
                            name={question.question}
                            component="input"
                            type="radio"
                            className="form-radio h-5 w-5 text-purple-600 hover:text-purple-400"
                            value="5"
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                  <div className="mt-10 text-center">
                    <Link href="/result">
                      <button
                        component="a"
                        className="py-3 w-64 text-xl text-white bg-purple-400 hover:bg-purple-600 font-black rounded-2xl"
                        type="submit"
                        disabled={pristine || submitting}
                      >
                        Submit
                      </button>
                    </Link>
                  </div>
                </form>
              )}
            />
          </>
        )}
      </main>

      <footer className="mt-20 text-center">
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
}
