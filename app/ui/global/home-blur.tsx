export default function HomeBlur() {
  return (
    <div className="fixed w-screen h-screen -z-50">
      <div className="absolute top-[-10vh] -left-[10vw] max-sm:left-[-10vw] shadow-anim bg-pink-500/20 w-3/4 h-1/2 -rotate-8 blur-[100px] rounded-[50%]"></div>
      <div className="absolute top-[-10vh] right-[10vh] max-sm:right-[-10vw] shadow-anim bg-blue-300/15 w-1/2 h-1/2 rotate-6 blur-[100px] rounded-[50%]"></div>
    </div>
  )
}