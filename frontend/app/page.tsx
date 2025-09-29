"use client";
import React, { useState } from "react";

interface Category {
  id: string;
  title: string;
  emoji: string;
}

interface Trend {
  name: string;
  change: number;
  price: string;
}

interface Comparison {
  country: string;
  price: string;
}

const HomePage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [region, setRegion] = useState<string>("UZ");

  const categories: Category[] = [
    { id: "food", title: "Oziq-ovqat", emoji: "🥔" },
    { id: "electronics", title: "Texnika", emoji: "📱" },
    { id: "auto", title: "Avtomobillar", emoji: "🚗" },
    { id: "energy", title: "Energiya", emoji: "⛽" },
    { id: "services", title: "Xizmatlar", emoji: "🏠" },
  ];

  const trending: Trend[] = [
    { name: "Kartoshka", change: -5, price: "8,000 so'm" },
    { name: "Benzin (AI-92)", change: 10, price: "14,500 so'm" },
    { name: "iPhone 16", change: -3, price: "$1,199" },
  ];

  const comparison: Comparison[] = [
    { country: "O‘zbekiston", price: "8,000 so'm" },
    { country: "Qozog‘iston", price: "120 KZT" },
    { country: "Qirg‘iziston", price: "50 KGS" },
    { country: "Rossiya (RU)", price: "25 RUB" },
  ];

  const trendingProducts: string[] = [
    "Kartoshka",
    "Benzin",
    "iPhone 16",
    "Nexia 3",
    "Un",
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold">PriceMonitor</div>
              <div className="text-sm text-slate-500">
                O‘zbekiston va mintaqa narxlari
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                className="border rounded-md px-3 py-2 text-sm"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="UZ">🇺🇿 O‘zbekiston</option>
                <option value="KZ">🇰🇿 Qozog‘iston</option>
                <option value="KG">🇰🇬 Qirg‘iziston</option>
                <option value="INTL">🌍 Xalqaro</option>
              </select>

              <button className="text-sm px-4 py-2 border rounded-md">
                Kirish
              </button>
              <button className="text-sm px-4 py-2 bg-indigo-600 text-white rounded-md">
                Ro‘yxatdan o‘tish
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HERO */}
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold">
                Bugungi narxlar — real vaqtda taqqoslang
              </h1>
              <p className="mt-2 text-indigo-100">
                O‘zbekiston va qo‘shni mamlakatlar bo‘yicha mahsulotlar narxini
                ko‘ring, trendlarni solishtiring va alert o‘rnating.
              </p>

              <div className="mt-4 flex items-center gap-3">
                <input
                  className="w-full md:w-96 rounded-md p-3 text-slate-800"
                  placeholder="Kartoshka, iPhone, Nexia qidiring..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="px-5 py-3 bg-white text-indigo-600 rounded-md font-semibold">
                  Qidirish
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/3 bg-white/10 p-4 rounded-lg">
              <div className="text-sm text-indigo-100">Bugun eng mashhur</div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {trendingProducts.map((p) => (
                  <div
                    key={p}
                    className="bg-white/20 rounded-md p-3 text-sm"
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Kategoriyalar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {categories.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md cursor-pointer"
              >
                <div className="text-2xl">{c.emoji}</div>
                <div className="mt-2 font-medium">{c.title}</div>
                <div className="text-sm text-slate-500 mt-1">
                  {c.id === "food"
                    ? "Kartoshka, Piyoz, Un..."
                    : "Mahsulotlarni ko‘ring"}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* TRENDING */}
          <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Bugungi trendlar</h3>
            <div className="space-y-4">
              {trending.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-slate-500">
                      Hozirgi narx: {t.price}
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      t.change > 0
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {t.change > 0 ? `+${t.change}%` : `${t.change}%`}
                  </div>
                </div>
              ))}
            </div>

            {/* Simple sparkline chart */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-slate-600 mb-2">
                Kartoshka - so‘nggi 30 kun
              </h4>
              <svg viewBox="0 0 300 60" className="w-full h-16">
                <polyline
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="2"
                  points="0,40 30,38 60,30 90,35 120,20 150,22 180,10 210,15 240,12 270,8 300,5"
                />
              </svg>
            </div>
          </div>

          {/* COMPARISON */}
          <aside className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">
              Mintaqaviy taqqoslash
            </h3>
            <div className="space-y-3">
              {comparison.map((c) => (
                <div
                  key={c.country}
                  className="flex justify-between text-sm"
                >
                  <div className="font-medium">{c.country}</div>
                  <div className="text-slate-600">{c.price}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm text-slate-500">
              Xaritani qo‘shish va heatmap ko‘rinishini keyingi bosqichda
              qo‘shamiz.
            </div>
          </aside>
        </div>

        {/* TRENDING PRODUCTS */}
        <section className="mt-8 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Eng ko‘p qidirilganlar
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {trendingProducts.map((p) => (
              <button
                key={p}
                className="border rounded-md p-3 text-sm text-left hover:shadow-md"
              >
                {p}
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-slate-600">
          © {new Date().getFullYear()} PriceMonitor — Hamkorlar: OLX, Avtoelon
          va mahalliy do‘konlar (demo)
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
