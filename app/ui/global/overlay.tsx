import { DiscordData, Spotify } from "@/app/lib/definitions/lanyard"
import clsx from "clsx"
import { ChevronLeft, LoaderCircle } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  return hours > 0 
    ? `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    : `${mins}:${secs.toString().padStart(2, '0')}`
}

function useTimeUpdater() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let animationFrame: number
    const updateProgress = () => {
      setProgress(Date.now())
      animationFrame = requestAnimationFrame(updateProgress)
    }

    updateProgress()
    return () => cancelAnimationFrame(animationFrame)
  }, [])

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
  const now = useTimeUpdater()
  const [visible, setVisible] = useState(true)

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 gap-2 flex flex-col justify-end items-end">
      <button
        type="button"
        onClick={() => setVisible(prev => !prev)}
        className={clsx(
          "cursor-pointer h-10 bg-slate-800 rounded-full appear flex justify-center items-center transition-all duration-300",
          {
            "opacity-0 translate-y-2.5 hidden": loading === true || !state?.activities,
            "translate-x-2": !visible
          }
        )}
      >
        <div className={clsx(
          "rounded-full overflow-hidden transition-all duration-300",
          {
            "w-[85px] pl-4 mr-1": visible,
            "w-0": !visible
          }
        )}>
          <p>
            Activities
          </p>
        </div>
        <div className="size-10 flex justify-center items-center">
          <ChevronLeft className="transition-transform duration-300" style={{
            transform: `rotateY(${visible ? '180deg' : '0'})`
          }} />
        </div>
      </button>

      <div className={clsx(
        "flex flex-col gap-2 items-end transition-all duration-300",
        {
          "translate-x-[calc(100%+16px)]": !visible,
          "translate-x-0": visible
        }
      )}>
        <div className={clsx(
          "size-10 bg-blue-400 rounded-full appear flex justify-center items-center transition-all duration-300",
          {
            "opacity-0 translate-y-2.5 hidden": loading === false
          }
        )}>
          <LoaderCircle className="animate-spin" />
        </div>
        <div className={clsx(
          "h-10 bg-red-500 select-none pointer-events-none rounded-full appear flex gap-2 px-3 justify-center items-center transition-all duration-200",
          {
            "opacity-0 translate-y-2.5 hidden": (loading || status) === true
          }
        )}>
          Disconnected, reload the page.
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
            <div key={activity.id} className="max-w-[min(100%,392px)] p-1 pr-6 bg-slate-900 rounded-full appear flex gap-2 items-center">
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
                <p className="font-bold select-none pointer-events-none truncate -my-0.5">
                  {activity.name}
                </p>
                <p className="text-sm select-none pointer-events-none truncate text-gray-500 -my-0.5">
                  {activity?.details ? activity.details : formatTime((Date.now() - activity.timestamps.start) / 1000) + ' elapsed'}
                </p>
              </div>
            </div>
          )
        })}
        {state.listening_to_spotify && (
          <a href={"https://open.spotify.com/track/" + spotify?.track_id} className="relative overflow-clip w-98 max-w-full bg-[#006000] rounded-2xl appear transition-all duration-200">
            <div className="absolute bg-blue-200/20 h-full top-0 left-0" style={{
              width: ((now - spotify.timestamps.start) / (spotify.timestamps.end - spotify.timestamps.start) * 100) + '%'
            }}></div>
            <div className="relative size-full flex gap-1 p-1">
              <Image
                src={spotify.album_art_url}
                width={64}
                height={64}
                className="rounded-xl select-none pointer-events-none"
                alt={spotify.album}
              />
              <div className="flex flex-1 min-w-0 select-none pointer-events-none flex-col justify-center">
                <p className="truncate max-w-full -my-0.5">
          {spotify.song}
                </p>
                <p className="text-sm select-none pointer-events-none max-w-full truncate text-gray-400 -my-0.5">
          {spotify.artist}
                </p>
              </div>
              <div className="flex-none flex justify-end items-center pr-2">
                <p className="text-sm select-none pointer-events-none text-center">
                {`${formatTime(Math.min(now - spotify.timestamps.start, spotify.timestamps.end - spotify.timestamps.start) / 1000)} / ${formatTime((spotify.timestamps.end - spotify.timestamps.start) / 1000)}`}
                </p>
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  )
}