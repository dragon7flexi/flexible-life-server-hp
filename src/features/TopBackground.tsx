'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"; // motionをインポート
import styles from "./TopBackground.module.css";

const images = [
    "/main_world_spawn2.png",
    "/tobigaya.jpg",
    "/rainbow_road.png",
    "/fountain.png",
]

export default function TopBackground() {
    const [currImgIdx, setCurrImgIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrImgIdx((prev) => (prev + 1) % images.length);
        }, 5000); // 5秒ごとに切り替え

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className={styles.background}
            key={currImgIdx} // `key`を使って状態変更をトリガー
            style={{
                backgroundImage: `url(${images[currImgIdx]})`,
                backgroundColor: 'black', // 背景色を黒に設定
            }}
            initial={{ opacity: 0 }}  // 初期状態で非表示
            animate={{ opacity: 1 }}   // アニメーションで表示
            exit={{ opacity: 0 }}      // 画像が非表示になるとき
            transition={{ duration: 1 }} // アニメーションの時間
        >
            {/* ここに文字や他のコンテンツを追加 */}
        </motion.div>
    );
}
