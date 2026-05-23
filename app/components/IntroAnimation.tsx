"use client";

import { useEffect, useRef, useState } from "react";

const words = [
  "Hello",
  "Halo",
  "Bonjour",
  "Ciao",
  "Olá",
  "こんにちは",
  "Hola",
  "Hallå",
  "Guten Tag",
  "مرحبا",
];

export default function IntroAnimation({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (index < words.length - 1) {
      const t = setTimeout(() => setIndex((i) => i + 1), 300);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setLeaving(true), 600);
      const t2 = setTimeout(() => onDoneRef.current(), 1100);
      return () => {
        clearTimeout(t);
        clearTimeout(t2);
      };
    }
  }, [index]);

  return (
    <div className={`intro-overlay${leaving ? " intro-leaving" : ""}`}>
      <p className="intro-word">{words[index]}</p>
    </div>
  );
}
