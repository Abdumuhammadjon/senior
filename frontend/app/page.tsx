// ...existing code...
"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  img?: string;
};

const products: Product[] = [
  { id: 1, name: "Laptop", price: 999, description: "High performance laptop", img: "/next.svg" },
  { id: 2, name: "Smartphone", price: 699, description: "Latest model smartphone", img: "/vercel.svg" },
  { id: 3, name: "Headphones", price: 199, description: "Noise cancelling headphones", img: "/file.svg" },
  { id: 4, name: "Smartwatch", price: 299, description: "Feature-rich smartwatch", img: "/globe.svg" },
  { id: 5, name: "Camera", price: 499, description: "Compact mirrorless camera", img: "/window.svg" },
  { id: 6, name: "Tablet", price: 399, description: "Portable tablet", img: "/next.svg" },
  { id: 7, name: "Speaker", price: 149, description: "Portable Bluetooth speaker", img: "/vercel.svg" },
  { id: 8, name: "Monitor", price: 249, description: "24\" IPS monitor", img: "/file.svg" },
  { id: 9, name: "Keyboard", price: 89, description: "Mechanical keyboard", img: "/globe.svg" },
];

function chunk<T>(arr: T[], size: number) {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res;
}

const slides = chunk(products, 3);

const ProductCard: React.FC<{ p: Product }> = ({ p }) => (
  <div className="rounded-lg shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300">
    <div className="p-4 bg-gradient-to-br from-indigo-600 via-pink-500 to-yellow-400 text-white flex flex-col gap-3 min-h-[200px]">
      {p.img && (
        <div className="w-full flex justify-center">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Image src={p.img} alt={p.name} width={64} height={64} className="object-contain" />
          </div>
        </div>
      )}
      <h3 className="text-base font-bold tracking-tight">{p.name}</h3>
      <p className="text-sm text-white/90 flex-1">{p.description}</p>
      <div className="w-full flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
          ${p.price}
        </span>
        <button className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-3 py-1 rounded-md shadow hover:opacity-95 transition">
          Buy
        </button>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const play = () => setIndex(i => (i + 1) % slides.length);
    if (!paused) intervalRef.current = window.setInterval(play, 3000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [paused]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div
        className="w-full max-w-4xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ width: `${slides.length * 100}%`, transform: `translateX(-${index * (100 / slides.length)}%)` }}
          >
            {slides.map((group, sIdx) => (
              <div key={sIdx} className="w-full flex-shrink-0 px-4 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {group.map(p => <ProductCard key={p.id} p={p} />)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Slide ${i+1}`}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full ${i === index ? "bg-indigo-600" : "bg-gray-300"}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIndex(i => (i - 1 + slides.length) % slides.length)}
              className="px-3 py-1 bg-white rounded shadow"
              aria-label="Previous"
            >
              Prev
            </button>
            <button
              onClick={() => setIndex(i => (i + 1) % slides.length)}
              className="px-3 py-1 bg-white rounded shadow"
              aria-label="Next"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// ...existing code...