'use client';

import { Overlay } from './ui/global/overlay';
import Header from './ui/home/header';
import Navbar from './ui/home/navbar';
import { useDiscordData } from './lib/discord';

export default function Home() {
  const { status, loading, discordData } = useDiscordData()

  return (
    <div className="flex flex-col overflow-x-hidden justify-center items-center gap-6 w-screen max-w-full min-h-screen">
      <Navbar data={discordData}/>
      <Overlay status={status} loading={loading} data={discordData}/>
      <Header />
    </div>
  );
}