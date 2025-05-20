'use client';

import { useEffect, useState } from "react";
import { useDiscordData } from "../lib/discord";
import HomeBlur from "../ui/global/home-blur";
import Navbar from "../ui/home/navbar";
import { LoaderCircle } from "lucide-react";

type TimeUnit = {
  id: string;
  duration: number;
}

export function getElapsedTime(startTime: number): TimeUnit[] {
  const NOW = Date.now()
  const ELAPSED = NOW - startTime
  
  const intervals = [
    { label: 'year', ms: 31536000 * 1000 },
    { label: 'month', ms: 2628000 * 1000 },
    { label: 'day', ms: 86400 * 1000 },
    { label: 'hour', ms: 3600 * 1000 },
    { label: 'minute', ms: 60 * 1000 },
    { label: 'second', ms: 1 * 1000 }
  ]

  let remaining = ELAPSED
  const result: TimeUnit[] = []
  let started = false

  for (const interval of intervals) {
    const value = Math.floor(remaining / interval.ms)
    
    if (value > 0 || started) {
      started = true
      result.push({
        id: `${interval.label}${value !== 1 ? 's' : ''}`,
        duration: value
      })
      remaining %= interval.ms
    }
  }

  return result
}

function checkEqual<T extends object, U extends object>(a: T, b: U): boolean {
  if (
    typeof a !== 'object' || a === null ||
    typeof b !== 'object' || b === null
  ) {
    return false;
  }

  const keysA = Object.keys(a) as (keyof T)[];
  const keysB = Object.keys(b) as (keyof U)[];

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    const valA = a[key];
    const valB = (b as never)[key]; // narrowed but still safe for comparison

    if (typeof valA === 'object' && typeof valB === 'object') {
      if (!checkEqual(valA as object, valB as object)) return false;
    } else {
      if (valA !== valB) return false;
    }
  }

  return true;
}

const loveMsgs = [
  "We're in love",
  "Proud owner of my cutie",
  "Obsessed w/ them",
  "In my heart",
  "Can't get enough of them",
  "LOVING THEM",
  "Adoring my lovey",
  "Cuddling my eepy partner"
]

export default function Sex() {
  const { discordData } = useDiscordData()
  const startingSize = 48
  const [ loveMsg, setLoveMsg ] = useState("")
  const [ timeElapsed, setTimeElapsed ] = useState<TimeUnit[]>([])

  useEffect(() => {
    if (timeElapsed.length === 0) {
      setLoveMsg(loveMsgs[Math.floor(Math.random() * loveMsgs.length)])
    }

    const lovingSince = Number(process.env.NEXT_PUBLIC_LOVING_SINCE as string)

    function checkDuration() {
      const newElapsed = getElapsedTime(lovingSince)
      if (!checkEqual(newElapsed, timeElapsed)) {
        setTimeElapsed(newElapsed)
      }
    }

    const interval = setInterval(checkDuration, 1)
    checkDuration()

    return () => {
      clearInterval(interval)
    }
  }, [timeElapsed])

  return (
    <div className="flex flex-col overflow-x-hidden justify-center items-center gap-6 w-screen max-w-full min-h-screen">
      <HomeBlur />
      <Navbar data={discordData}/>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        {timeElapsed.length > 1 ? (
          <>
            <p className="shiny-text">
              {loveMsg} since: 💖
            </p>
            {timeElapsed.map((item, index) => {
              return (
                <p key={index} className="font-extrabold" style={{
                  fontSize: `${startingSize - 6 * (index == 0 ? 0 : index + 1)}px`
                }}>
                  {item.duration} {item.id}
                </p>
              )
            })}
          </>
        ) : (
          <LoaderCircle className="animate-spin" />
        )}

      </div>
    </div>
  )
}