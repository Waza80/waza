'use client';

import HomeBlur from "../global/home-blur";

export default function Header() {
  return (
    <>
      <HomeBlur />
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="font-black text-4xl">
          Coming back soon...
        </p>
      </div>
    </>
  )
}