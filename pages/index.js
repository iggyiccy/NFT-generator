import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import { hasEthereum } from "../utils/ethereum";
import Greeter from "../src/artifacts/contracts/Greeter.sol/Greeter.json";
import { Form, Field } from "react-final-form";
import {
  getChoices,
  getQuestions,
} from "@alheimsins/b5-johnson-120-ipip-neo-pi-r";

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
                  <div class="inline-flex mt-4">
                    <label class="text-gray-700">Best Stooge</label>
                    <div class="ml-4 ">
                      <label class="inline-flex items-center">
                        <Field
                          class="form-radio h-5 w-5 text-purple-600"
                          name="stooge"
                          component="input"
                          type="radio"
                          value="larry"
                        />{" "}
                        <span class="ml-2 text-gray-700">Larry</span>
                      </label>
                    </div>
                    <div class="ml-4 ">
                      <label class="inline-flex items-center">
                        <Field
                          class="form-radio h-5 w-5 text-purple-600"
                          name="stooge"
                          component="input"
                          type="radio"
                          value="larry"
                        />{" "}
                        <span class="ml-2 text-gray-700">Larry</span>
                      </label>
                    </div>
                    <div class="ml-4 ">
                      <label class="inline-flex items-center">
                        <Field
                          class="form-radio h-5 w-5 text-purple-600"
                          name="stooge"
                          component="input"
                          type="radio"
                          value="larry"
                        />{" "}
                        <span class="ml-2 text-gray-700">Larry</span>
                      </label>
                    </div>
                  </div>
                  <pre class="mt-4 mb-4">{JSON.stringify(values, 0, 2)}</pre>
                  <button type="submit" disabled={pristine || submitting}>
                    Submit
                  </button>
                  <button
                    class="ml-4"
                    type="button"
                    onClick={form.reset}
                    disabled={pristine || submitting}
                  >
                    Reset
                  </button>
                </form>
              )}
            />
            <div className="space-y-8">
              <div className="flex flex-col space-y-4">
                <input
                  className="border p-4 w-100 text-center"
                  placeholder="A fetched greeting will show here"
                  value={greeting}
                  disabled
                />
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md w-full"
                  onClick={fetchGreeting}
                >
                  Fetch greeting from the blockchain
                </button>
              </div>
              <div className="space-y-8">
                <div className="flex flex-col space-y-4">
                  <input
                    className="border p-4 text-center"
                    onChange={(e) => setNewGreetingState(e.target.value)}
                    placeholder="Write a new greeting"
                    ref={newGreetingInputRef}
                  />
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md"
                    onClick={setGreeting}
                  >
                    Set new greeting on the blockchain
                  </button>
                  <div className="h-2">
                    {newGreetingMessage && (
                      <span className="text-sm text-gray-500 italic">
                        {newGreetingMessage}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="mt-20">
        <a
          href="https://github.com/tomhirst/solidity-nextjs-starter/blob/main/README.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
        >
          Read the docs
        </a>
      </footer>
    </div>
  );
}
