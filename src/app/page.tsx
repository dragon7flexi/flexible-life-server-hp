"use client";

import { useEffect, useRef } from "react";

const imgs = [
    "main_world_spawn2.png",
    "tobigaya.jpg",
    "5th_world_day.png",
    "rainbow_road.png",
    "tobigaya_lava.jpg",
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

    let currImgIdx = 0;
    let nextImgIdx = 1;

    if (!currBg.current || !nextBg.current || !currMsg.current || !nextMsg.current) return;

    currBg.current.style.backgroundImage = `url(${imgs[currIdx]})`;

    nextBg.current.style.backgroundImage = `url(${imgs[nextIdx]})`;

    currMsg.current.innerText = msgs[currIdx];

    nextMsg.current.innerText = msgs[nextIdx];
    nextMsg.current.style.opacity = "0";

    function animate() {
      const currMsgAnimation = currMsg.current?.animate(
        [
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: "translateY(50px)" }
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
          { opacity: 0, transform: "translateY(-80px)" },
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

      const currBgAnimation = currBg.current?.animate(
        [
          { opacity: 1 },
          { opacity: 0 }
        ],
        {
          duration: 1000,
          easing: "ease"
        }
      );

      currBgAnimation?.addEventListener("finish", () => {
        currImgIdx = (currImgIdx + 1) % msgs.length;
        nextImgIdx = (nextImgIdx + 1) % imgs.length;

        if (currBg.current && nextBg.current) {
          currBg.current.style.opacity = "0";

          currBg.current.style.backgroundImage = `url(${imgs[currImgIdx]})`;
          currBg.current.style.opacity = "1";

          nextBg.current.style.backgroundImage = `url(${imgs[nextImgIdx]})`;
          nextBg.current.style.opacity = "1"
        }
      });


    }

    currMsg.current?.animate(
      [
        { opacity: 0, transform: "translateY(-50px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      {
        duration: 1000,
        easing: "ease",
      }
    );

    setInterval(() => {
      animate()
    }, 4000);
  }, []);

  return (
    <div className="font-serif text-white">
      <div className="fixed w-full h-[50%] flex items-center justify-center text-7xl">
        <p ref={currMsg} className="fixed">curr</p>
        <p ref={nextMsg} className="fixed">next</p>
      </div>

      <div className="fixed w-full h-full flex items-center justify-center">
        <button>参加する</button>
      </div>

      <div className="fixed w-full h-full bg-cover bg-center -z-10" ref={currBg}></div>
      <div className="fixed w-full h-full bg-cover bg-center -z-20" ref={nextBg}></div>
    </div>
  );
}
