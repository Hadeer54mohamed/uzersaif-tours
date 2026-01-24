"use client";

import React, { useMemo } from "react";
import { useTranslations, useMessages } from "next-intl";

export default function Guarantees() {
  const tDesertTrip = useTranslations("desertTrip");
  const messages = useMessages();

  const guaranteesData = messages?.desertTrip?.trips?.["white-desert-premium"]?.guarantees;
  const guaranteesList = useMemo(() => Object.values(guaranteesData || {}), [guaranteesData]);

  if (guaranteesList.length === 0) return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-black mb-6 text-primary text-center md:text-[clamp(1.4rem,4vw,2.5rem)]">
        {tDesertTrip("guaranteeTitle")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {guaranteesList.map((g, i) => (
          <div key={i} className="bg-black/60 backdrop-blur-md rounded-xl p-5 border-2 border-[#F47A1F]/40 transition-all duration-300 hover:scale-[1.02] hover:border-[#F47A1F]/60 hover:shadow-lg hover:shadow-[#F47A1F]/20">
            <h4 className="text-[clamp(1.4rem,4.5vw,2.5rem)] font-black text-[#F47A1F] mb-3 flex items-center gap-2 md:text-base md:font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F47A1F]"></span>
              {g.title}
            </h4>
            <ul className="space-y-2">
              {g.items?.map((item, idx) => (
                <li key={idx} className="flex gap-2 text-[#B6BDD6] items-start">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                  <span className="font-bold text-[clamp(1rem,3.5vw,1.8rem)] text-white/90 md:text-xs md:font-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 bg-emerald-500/30 backdrop-blur-md rounded-xl p-5 border border-emerald-500/30 flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-500/40 shadow-lg">
          <p className="text-white font-black text-[clamp(1.25rem,4vw,2.2rem)] text-center leading-relaxed md:text-sm">
            {tDesertTrip("guaranteeNote")}
          </p>
        </div>
      </div>
    </div>
  );
}
