import Head from "next/head";
import Image from "next/image";
import connectedWalletAddress from "./index";
// {
//   "Paint or draw": "5"
// }

export default function Result() {
  return (
    <div className="max-w-lg mt-36 mx-auto">
      <Head>
        <title>Personalised NFT</title>
        <meta name="result" content="personality result" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="space-y-48">
        {!process.env.NEXT_PUBLIC_GREETER_ADDRESS ? (
          <p className="text-md">
            Please add a value to the <pre>NEXT_PUBLIC_GREETER_ADDRESS</pre>{" "}
            environment variable.
          </p>
        ) : (
          <>
            <h1 className="text-4xl text-center font-black mb-80">
              🔮 Your Personalised NFT
            </h1>
            {/* <div className="container bg-white">.</div> */}
            {/* !!Doesn't work!! */}
            {/* <div className="h-4 text-center font-thin">
              {connectedWalletAddress && (
                <p className="text-md">{connectedWalletAddress}</p>
              )}
            </div> */}
            <div className="p-10 bg-gradient-to-br from-purple-50 to-white shadow-xl rounded-lg my-20">
              <div className="flex justify-center -mt-80">
                <img
                  className="w-50 h-70 object-cover rounded-lg border-2 border-purple-600"
                  src="https://images.pokemontcg.io/xy1/1.png"
                />
              </div>
              <div>
                <h2 className="mt-10 text-gray-800 text-3xl font-semibold">
                  Monster Name
                </h2>
                <p className="mt-2 text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  dolores deserunt ea doloremque natus error, rerum quas odio
                  quaerat nam ex commodi hic, suscipit in a veritatis pariatur
                  minus consequuntur!
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <a
                  href="#"
                  className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-600"
                >
                  Mint Now
                </a>
              </div>
            </div>
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
