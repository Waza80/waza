import { DiscordData } from "@/app/page"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Navbar({
  data
}: {
  data: DiscordData | object
}) {
  const state = data as DiscordData
  const user = state?.discord_user
  //const [opened, setOpened] = useState(false)
  const [savedAvatar, setSavedAvatar] = useState<string | null>(null)

  const avatar = user ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}${user.avatar.match('a_') ? ".gif?size=512" : ".webp?size=512"}` : null
  
  useEffect(() => {
    try {
      const stored = localStorage.getItem('avatar')
      setSavedAvatar(stored)
      if (avatar && avatar !== stored) {
        localStorage.setItem('avatar', avatar)
        setSavedAvatar(avatar)
      }
    } catch {}
  }, [avatar])

  /*
  const handleClick = () => {
    setOpened(!opened)
  }
  */

  return (
    <nav className="z-50 fixed top-10 h-[76px] rounded-2xl flex items-center py-1 px-4 w-[70vw] max-sm:min-w-[calc(100vw-32px)] max-w-[912px] bg-black/50 border border-black backdrop-blur-md">
      {(avatar || savedAvatar) ? <Image
        src={avatar || savedAvatar || ''}
        alt=""
        className="select-none pointer-events-none rounded-full"
        style={{
          filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.7))"
        }}
        width={48}
        height={48}
      /> : <div className="size-12" style={{
        filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.7))"
      }}></div>}
    </nav>
  )
}