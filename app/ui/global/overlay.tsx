import { DiscordData, Spotify } from "@/app/page"
import clsx from "clsx"
import { LoaderCircle, X } from "lucide-react"
import Image from "next-export-optimize-images/image"
import { useState, useEffect } from "react"

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  return hours > 0 
    ? `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    : `${mins}:${secs.toString().padStart(2, '0')}`
}

function useSpotifyProgress(start?: number, end?: number) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!start || !end) return

    let animationFrame: number
    const duration = end - start
    
    const updateProgress = () => {
      const now = Date.now()
      const elapsed = now - start
      const newProgress = Math.min(elapsed, duration)
      
      setProgress(newProgress)
      
      if (elapsed < duration) {
        animationFrame = requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
    return () => cancelAnimationFrame(animationFrame)
  }, [start, end])

  return progress
}

export function Overlay({
  status,
  loading,
  data
}: {
  status: boolean,
  loading: boolean,
  data: DiscordData | object
}) {
  const state = data as DiscordData
  const spotify = state.spotify as Spotify
  const progress = useSpotifyProgress(spotify?.timestamps?.start, spotify?.timestamps?.end)

  return (
    <div className="fixed z-50 w-screen h-screen p-4 gap-2 flex flex-col justify-end items-end">
      <div className={clsx(
        "size-10 bg-blue-400 rounded-full appear flex justify-center items-center transition-all duration-200",
        {
          "opacity-0 translate-y-2.5 hidden": loading === false
        }
      )}>
        <LoaderCircle className="animate-spin" />
      </div>
      <div className={clsx(
        "size-10 bg-red-500 rounded-full appear flex justify-center items-center transition-all duration-200",
        {
          "opacity-0 translate-y-2.5 hidden": (loading || status) === true
        }
      )}>
        <X/>
      </div>
      <div className={clsx(
        "transition-all duration-200 appear",
        {
          "opacity-0 translate-y-2.5 hidden": loading === true || (state.listening_to_spotify || (state?.activities && state.activities.length > 0))
        }
      )}>
        <p className="text-gray-500 font-bold select-none">I am eeping -w-</p>
      </div>
      {state?.activities && state.activities.map(activity => {
        if (activity.name === 'Spotify') return
        return (
          <div key={activity.id} className="w-72 max-w-full p-1 bg-slate-900 rounded-full appear flex gap-2 items-center">
            <Image
              src={activity.assets?.large_image ? (activity.assets.large_image.startsWith("mp:external/")
                ? `https://media.discordapp.net/external/${activity.assets.large_image.replace("mp:external/", "")}` 
                : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.webp`) : '/assets/unknown-activity.webp'}
              width={42}
              height={42}
              className="rounded-full select-none pointer-events-none"
              alt=""
            />
            <div className="flex flex-col">
              <p className="font-bold -my-0.5">
                {activity.name}
              </p>
              <p className="text-sm text-gray-500 -my-0.5">
                {activity?.details ? activity.details : formatTime((Date.now() - activity.timestamps.start) / 1000) + ' elapsed'}
              </p>
            </div>
          </div>
        )
      })}
      {state.listening_to_spotify && (
        <a href={"https://open.spotify.com/track/" + spotify?.track_id} className="relative overflow-clip w-98 max-w-full bg-[#006000] rounded-2xl appear transition-all duration-200">
          <div className="absolute bg-blue-200/20 h-full top-0 left-0" style={{
            width: (((spotify.timestamps.start + progress) - spotify.timestamps.start) / (spotify.timestamps.end - spotify.timestamps.start) * 100) + '%'
          }}></div>
          <div className="relative size-full flex gap-1 p-1">
            <Image
              src={spotify.album_art_url}
              width={64}
              height={64}
              className="rounded-xl select-none pointer-events-none"
              alt={spotify.album}
            />
            <div className="flex flex-col justify-center">
              <p className="-my-0.5">
                {spotify.song}
              </p>
              <p className="text-sm text-gray-400 -my-0.5">
                {spotify.artist}
              </p>
            </div>
            <div className="flex-1 flex justify-end items-center pr-2">
              <p className="text-sm text-center">
              {`${formatTime(progress / 1000)} / ${formatTime((spotify.timestamps.end - spotify.timestamps.start) / 1000)}`}
              </p>
            </div>
          </div>
        </a>
      )}
    </div>
  )
}