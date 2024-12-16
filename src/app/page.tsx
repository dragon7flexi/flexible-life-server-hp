"use client";

import { useEffect, useRef } from "react";

const imgs = [
    "tobigaya_lava.jpg",
    "main_world_spawn2.png",
    "tobigaya.jpg",
    "5th_world_day.png",
    "rainbow_road.png",
];

imgs.forEach((name, idx, arr) => {
    arr[idx] = `/${name}`;
});

const msgs = [
    "ようこそ Flexible Life Serverへ",
    "広大なワールドを探索しよう",
    "仲間たちと建築をしよう",
    "豊富なミニゲームを遊ぼう",
    "さあ、新しい冒険へ",
];


export default function Home() {
  const currBg = useRef<HTMLDivElement | null>(null);
  const nextBg = useRef<HTMLDivElement | null>(null);

  const currMsg = useRef<HTMLDivElement | null>(null);
  const nextMsg = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let currIdx = 0;
    let nextIdx = 1;

    if (!currBg.current || !nextBg.current || !currMsg.current || !nextMsg.current) return;

    currMsg.current.innerText = msgs[currIdx];
    currMsg.current.style.opacity = "1"

    nextMsg.current.innerText = msgs[nextIdx];
    nextMsg.current.style.opacity = "0";

    function animate() {
      const currMsgAnimation = currMsg.current?.animate(
        [
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: "translateY(80px)" }
        ],
        {
          duration: 1000,
          easing: "ease",
        }
      );

      currMsgAnimation?.addEventListener("finish", () => {
        currIdx = (currIdx + 1) % msgs.length;

        if (currMsg.current) {
          currMsg.current.style.opacity = "0";
          currMsg.current.innerText = msgs[currIdx];
          currMsg.current.style.opacity = "1";
        }
      });

      const nextMsgAnimation = nextMsg.current?.animate(
        [
          { opacity: 0, transform: "translateY(-50px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        {
          duration: 1000,
          easing: "ease",
        }
      );

      nextMsgAnimation?.addEventListener("finish", () => {
        nextIdx = (nextIdx + 1) % msgs.length;

        if (nextMsg.current) {
          nextMsg.current.style.opacity = "1";
          nextMsg.current.innerText = msgs[nextIdx];
          nextMsg.current.style.opacity = "0";
        }
      });
    }

    setInterval(() => {
      animate()
    }, 4000);
  }, []);

  return (
    <div className="font-serif">
      <div className="fixed w-full h-[50%] flex items-center justify-center text-7xl">
        <p ref={currMsg} className="fixed">curr</p>
        <p ref={nextMsg} className="fixed">next</p>
      </div>

      <div className="fixed w-full h-full flex items-center justify-center">
        <button>参加する</button>
      </div>

      <div className="fixed w-full h-full" ref={currBg}></div>
      <div className="fixed w-full h-full" ref={nextBg}></div>
    </div>
  );
}
