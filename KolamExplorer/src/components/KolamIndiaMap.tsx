import React, { useState } from "react";

// -------------------- DATA --------------------
const STATES = [
  "Tamil Nadu",

  "Karnataka",
  "Andhra Pradesh",
  "Telangana",
] as const;

export const STATE_INFO: Record<
  (typeof STATES)[number],
  { description: string; kolam: string; map: string }
> = {
  "Tamil Nadu": {
    description: "Kolam is drawn daily at the entrance, symbolizing prosperity.",
    kolam: "/images/kolam1.jpg",
    map: "/images/tamilnadu.png",
  },

  Karnataka: {
    description: "Muggulu and Rangoli are drawn in front of homes.",
    kolam: "/images/kolam6.jpg",
    map: "/images/karnataka.png",
  },
  "Andhra Pradesh": {
    description: "Muggulu drawn with lime powder and rice flour.",
    kolam: "/images/kolam8.jpg",
    map: "/images/andhrapradesh.png",
  },
  Telangana: {
    description: "Known for colorful Muggulu designs during Sankranti.",
    kolam: "/images/kolam10.jpg",
    map: "/images/telengana.png",
  },
};

// -------------------- MAIN COMPONENT --------------------
export default function KolamIndiaMap() {
  const [index, setIndex] = useState(0);
  const selectedState = STATES[index];

  const nextState = () => setIndex((i) => (i + 1) % STATES.length);
  const prevState = () => setIndex((i) => (i - 1 + STATES.length) % STATES.length);

  return (
    <div className="flex flex-col w-full h-full p-2 gap-4">
      {/* Panels */}
      <div className="flex flex-col md:flex-row gap-4 w-full h-full">
        
{/* Left panel */}
<aside className="flex-shrink-0 md:w-1/3 bg-white/80 backdrop-blur-sm border border-amber-200 p-5 rounded-2xl shadow-lg flex flex-col">
  <h2 className="text-2xl font-bold text-amber-800 mb-4">Origins & Significance</h2>

  <div className="flex-1 overflow-auto space-y-5 text-sm pr-2">
    {/* Early History */}
    <div className="flex items-start gap-3">
      <div className="text-2xl">🏺</div>
      <div>
        <div className="font-semibold text-amber-700">2nd Century BCE</div>
        <div className="text-xs text-gray-700">
          Sangam literature mentions <b>Kolam</b> as a sacred threshold art. 
          Daily drawings at dawn symbolized <i>order, discipline, and cosmic rhythm</i>.
        </div>
      </div>
    </div>

    {/* Rituals */}
    <div className="flex items-start gap-3">
      <div className="text-2xl">🪔</div>
      <div>
        <div className="font-semibold text-amber-700">Medieval Temples</div>
        <div className="text-xs text-gray-700">
          Kolams were used in <b>temple courtyards</b> during rituals and festivals.  
          They became offerings to deities, welcoming prosperity, fertility, and harmony. 
        </div>
      </div>
    </div>

    {/* Math + Art */}
    <div className="flex items-start gap-3">
      <div className="text-2xl">📐</div>
      <div>
        <div className="font-semibold text-amber-700">Cultural Mathematics</div>
        <div className="text-xs text-gray-700">
          Over centuries, designs evolved to include <b>geometry, symmetry, recursion, 
          and fractals</b>. They represent a form of <i>oral mathematical knowledge</i>, 
          passed down through women’s artistry.
        </div>
      </div>
    </div>

    {/* Eco & Social */}
    <div className="flex items-start gap-3">
      <div className="text-2xl">🌾</div>
      <div>
        <div className="font-semibold text-amber-700">Living Tradition</div>
        <div className="text-xs text-gray-700">
          Kolams are eco-friendly, drawn with <b>rice flour</b> to feed birds and ants.  
          They reinforce <b>community bonds</b>, with neighbors exchanging designs and 
          children learning by imitation.
        </div>
      </div>
    </div>

    {/* Modern Era */}

  </div>
</aside>


        {/* Middle panel - Kolam */}
        <section className="flex-shrink-0 md:w-1/3 bg-gray-50 p-4 rounded-lg shadow flex flex-col">
          <h2 className="text-xl font-semibold mb-2">{selectedState} – Kolam</h2>
          <div className="flex-1 flex flex-col gap-3 overflow-auto">
            <div className="p-3 bg-white rounded border text-gray-600 text-sm">
              {STATE_INFO[selectedState].description}
            </div>
            <div className="h-[250px] w-full border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src={STATE_INFO[selectedState].kolam}
                alt={`${selectedState} kolam`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </section>

        {/* Right panel - Map */}
        <section className="flex-1 bg-gray-50 p-4 rounded-lg shadow flex flex-col">
          <h2 className="text-xl font-semibold mb-3">{selectedState} – Map</h2>
          <div className="w-full flex items-center justify-center overflow-auto border rounded-lg bg-gray-50 p-2">
            <img
              src={STATE_INFO[selectedState].map}
              alt={`${selectedState} map`}
              className="w-full h-auto object-contain"
            />
          </div>
        </section>
      </div>

      {/* Bottom navigation */}
      <div className="flex justify-center gap-4 mt-2">
        <button
          onClick={prevState}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          ⏮️ Previous
        </button>
        <button
          onClick={nextState}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Next ⏭️
        </button>
      </div>
    </div>
  );
}
