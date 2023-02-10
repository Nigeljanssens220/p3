import { type NextPage } from "next";
import Head from "next/head";
import { Tabs, TabsList, TabsTrigger } from "../components/Tabs";
import Games from "../components/Tabs/Panels/Games";
import Input from "../components/Tabs/Panels/Input";
import PlayerScores from "../components/Tabs/Panels/PlayerScores";

const Home: NextPage = () => {
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
          <Tabs
            defaultValue="playerScore"
            className="flex w-full flex-col items-center"
          >
            <TabsList>
              <TabsTrigger value="playerScore">Player Score</TabsTrigger>
              <TabsTrigger value="games">Games</TabsTrigger>
              <TabsTrigger value="input">Input</TabsTrigger>
            </TabsList>
            <PlayerScores />
            <Games />
            <Input />
          </Tabs>
        </div>
      </main>
    </>
  );
};

export default Home;
