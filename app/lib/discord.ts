import { useState, useEffect } from 'react'
import { DiscordData } from '@/app/lib/definitions/lanyard'

export function useDiscordData() {
  const [status, setStatus] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [discordData, setDiscordData] = useState<DiscordData|object>({})

  useEffect(() => {
    const ws = new WebSocket('wss://api.lanyard.rest/socket')
    let beatInterval: number
    let beatFunction: NodeJS.Timeout

    ws.onerror = () => { 
      setLoading(false)
      setStatus(false) 
    }

    ws.onclose = () => {
      if (beatFunction) { 
        clearInterval(beatFunction) 
      }
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
        beatFunction = setInterval(() => { 
          ws.send(JSON.stringify({op: 3})) 
        }, beatInterval)
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

  return { status, loading, discordData }
}