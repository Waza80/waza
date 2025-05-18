'use client';

import React, { useState, useEffect } from 'react'
import { Overlay } from './ui/global/overlay';
import Header from './ui/home/header';

export interface KV {
  location: string;
}

export interface SpotifyTimestamps {
  start: number;
  end: number;
}

export interface Spotify extends Activity {
  track_id: string;
  timestamps: SpotifyTimestamps;
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

export interface DiscordUser {
  username: string;
  public_flags: number;
  id: string;
  discriminator: string;
  avatar: string;
}

export interface ActivityTimestamps {
  start: number;
  end?: number;
}

export interface ActivityAssets {
  large_text?: string;
  large_image?: string;
  small_text?: string;
  small_image?: string;
}

export interface ActivityParty {
  id: string;
}

export type Activity = {
  type: number;
  timestamps: ActivityTimestamps;
  sync_id?: string;
  state: string;
  session_id?: string;
  party?: ActivityParty;
  name: string;
  id: string;
  flags?: number;
  details?: string;
  created_at: number;
  assets: ActivityAssets;
  application_id?: string;
}

export type DiscordData = {
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
  listening_to_spotify: boolean;
  kv: KV;
  spotify: Spotify | null;
  discord_user: DiscordUser;
  discord_status: string;
  activities: Activity[];
} & object

export default function Home() {
  const [status, setStatus] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [discordData, setDiscordData] = useState<DiscordData|object>({})

  useEffect(() => {
    const ws = new WebSocket('wss://api.lanyard.rest/socket')
    let beatInterval, beatFunction: NodeJS.Timeout
    ws.onerror = () => { setLoading(false); setStatus(false) }
    ws.onclose = () => {
      if (beatFunction) { clearInterval(beatFunction) }
      setLoading(false)
      setStatus(false)
    }

    function handleState(event: DiscordData) {
      setDiscordData(event)
    }

    ws.onmessage = (event) => {
      const eventData = JSON.parse(event.data)
      if (eventData.op == 1) {
        beatInterval = eventData.d.heartbeat_interval
        beatFunction = setInterval(() => { ws.send(JSON.stringify({op: 3})) }, beatInterval)
        ws.send(JSON.stringify({
          op: 2,
          d: {
            subscribe_to_ids: ["959534223293833256"],
          }
        }))
      } else if (eventData.op == 0) {
        if (eventData.t === "INIT_STATE") {
          handleState(eventData.d[Object.keys(eventData.d)[0]])
        } else {
          handleState(eventData.d)
        }
      }
    }

    if (loading) {
      setLoading(false)
      setStatus(true)
    }
  }, [loading])

  return (
    <div className="flex flex-col overflow-x-hidden justify-center items-center gap-6 w-screen max-w-full min-h-screen">
      <Overlay status={status} loading={loading} data={discordData}/>
      <Header />
    </div>
  );
}