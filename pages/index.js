import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import { hasEthereum } from "../utils/ethereum";
import { Form, Field } from "react-final-form";
import { questions } from "../data/question";
import createDecorator from "final-form-calculate";

export default function Home() {
  const [connectedWalletAddress, setConnectedWalletAddressState] = useState("");
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
                    <Image
                      src="/angry-1991061.svg"
                      width={40}
                      height={40}
                      alt="1.angry"
                    />
                    <Image
                      src="/sad-1991063.svg"
                      width={40}
                      height={40}
                      alt="2.sad"
                    />
                    <Image
                      src="/care-1991058.svg"
                      width={40}
                      height={40}
                      alt="3.care"
                    />
                    <Image
                      src="/like-1991059.svg"
                      width={40}
                      height={40}
                      alt="4.like"
                    />
                    <Image
                      src="/love-1991064.svg"
                      width={40}
                      height={40}
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
                            name={
                              question.index +
                              " " +
                              question.scale +
                              " - " +
                              question.question
                            }
                            component="input"
                            type="radio"
                            className="form-radio h-5 w-5 ml-7 text-purple-600 hover:text-purple-400"
                            value="1"
                          />
                        </label>
                        <label
                          id="radioButton"
                          className="inline-flex items-center"
                        >
                          <Field
                            id={question.question}
                            name={
                              question.index +
                              " " +
                              question.scale +
                              " - " +
                              question.question
                            }
                            component="input"
                            type="radio"
                            className="form-radio h-5 w-5 ml-7  text-purple-600 hover:text-purple-400"
                            value="2"
                          />
                        </label>
                        <label
                          id="radioButton"
                          className="inline-flex items-center"
                        >
                          <Field
                            id={question.question}
                            name={
                              question.index +
                              " " +
                              question.scale +
                              " - " +
                              question.question
                            }
                            component="input"
                            type="radio"
                            className="form-radio h-5 w-5 ml-6  text-purple-600 hover:text-purple-400"
                            value="3"
                          />
                        </label>
                        <label
                          id="radioButton"
                          className="inline-flex items-center"
                        >
                          <Field
                            id={question.question}
                            name={
                              question.index +
                              " " +
                              question.scale +
                              " - " +
                              question.question
                            }
                            component="input"
                            type="radio"
                            className="form-radio h-5 w-5 ml-6  text-purple-600 hover:text-purple-400"
                            value="4"
                          />
                        </label>
                        <label
                          id="radioButton"
                          className="inline-flex items-center"
                        >
                          <Field
                            id={question.question}
                            name={
                              question.index +
                              " " +
                              question.scale +
                              " - " +
                              question.question
                            }
                            component="input"
                            type="radio"
                            className="form-radio h-5 w-5 ml-5  text-purple-600 hover:text-purple-400"
                            value="5"
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                  <div className="mt-10 text-center">
                    <Link href="/result" passHref>
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
