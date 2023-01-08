import { type NextPage } from "next";
import Head from "next/head";
import Tabs from "../components/Tabs";
import prefetchAllPlayers from "../hooks/useAllPlayers";

const Home: NextPage = () => {
  // This helper function prefetches all players, so that when we actually need them we don't have to wait for the API to respond
  prefetchAllPlayers();

  return (
    <>
      <Head>
        <title>Ping Pong Poule</title>
        <meta name="description" content="The forever Ping Pong Poule" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pt-12">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Ping <span className="text-[hsl(280,100%,70%)]">Pong</span> Poule
          </h1>
          <Tabs />
        </div>
      </main>
    </>
  );
};

export default Home;
