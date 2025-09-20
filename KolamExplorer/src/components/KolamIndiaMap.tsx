import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// -------------------- DATA --------------------
export const STATE_INFO = {
  "Tamil Nadu": { /* ... same as before ... */ },
  "Kerala": { /* ... */ },
  "Karnataka": { /* ... */ },
  "Andhra Pradesh": { /* ... */ },
  "Telangana": { /* ... */ }
};

export const SOUTH_INDIA_GALLERIES = {
  "Tamil Nadu": ["/images/kolam1.jpg", "/images/kolam2.jpg", "/images/kolam3.jpg"],
  "Kerala": ["/images/kolam4.jpg", "/images/kolam5.jpg"],
  "Karnataka": ["/images/kolam6.jpg", "/images/kolam7.jpg"],
  "Andhra Pradesh": ["/images/kolam8.jpg", "/images/kolam9.jpg"],
  "Telangana": ["/images/kolam10.jpg", "/images/kolam11.jpg"]
};

const SOUTH_STATES = new Set(Object.keys(STATE_INFO));

// -------------------- MAIN COMPONENT --------------------
export default function KolamIndiaMap() {
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [sidebarText, setSidebarText] = useState(
    "Click on a state for info — South India opens a modal."
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [factIndex, setFactIndex] = useState(0);

  const facts = [
    "Kolam uses rice flour to feed ants and birds — eco-friendly!",
    "Some Kolam patterns hide mathematical beauty — symmetry & recursion.",
    "Pookalam (Kerala) is made using fresh flowers during Onam.",
    "Drawing kolam daily is considered an auspicious ritual in many homes."
  ];

  useEffect(() => {
    const t = setInterval(() => setFactIndex((i) => (i + 1) % facts.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let cleanupListeners = () => {};

    fetch("/in.svg", { signal })
      .then((r) => r.text())
      .then((svgText) => {
        if (!svgContainerRef.current) return;

        svgContainerRef.current.innerHTML = svgText;

        // Make SVG scale properly
        const svgEl = svgContainerRef.current.querySelector("svg");
        if (svgEl) {
          svgEl.setAttribute("width", "100%");
          svgEl.setAttribute("height", "100%");
          svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
        }

        const paths = svgContainerRef.current.querySelectorAll("path, polygon, rect");
        const eventListeners: any[] = [];

        paths.forEach((p) => {
          // Try to detect state from id or class
          const attr = p.getAttribute("id") || p.getAttribute("class") || "";
          const stateName = Object.keys(STATE_INFO).find((s) =>
            attr.toLowerCase().includes(s.replace(/\s/g, "").toLowerCase())
          );

          const handleMouseEnter = () => {
            (p as SVGElement).style.fill = "#ef4444";
          };

          const handleMouseLeave = () => {
            (p as SVGElement).style.fill = stateName && SOUTH_STATES.has(stateName)
              ? "#f59e0b"
              : "#9ca3af";
          };

          const handleClick = () => {
            if (!stateName) return;
            if (SOUTH_STATES.has(stateName)) {
              setSelectedState(stateName);
              setModalOpen(true);
            } else {
              const info = STATE_INFO[stateName] || {};
              setSidebarText(
                `${stateName}: ${info.description || "Regional rangoli/kolam traditions."}`
              );
            }
          };

          (p as SVGElement).style.cursor = "pointer";
          (p as SVGElement).style.fill = stateName && SOUTH_STATES.has(stateName)
            ? "#f59e0b"
            : "#9ca3af";

          p.addEventListener("mouseenter", handleMouseEnter);
          p.addEventListener("mouseleave", handleMouseLeave);
          p.addEventListener("click", handleClick);

          eventListeners.push({ p, type: "mouseenter", handler: handleMouseEnter });
          eventListeners.push({ p, type: "mouseleave", handler: handleMouseLeave });
          eventListeners.push({ p, type: "click", handler: handleClick });
        });

        setSvgLoaded(true);

        cleanupListeners = () => {
          eventListeners.forEach(({ p, type, handler }) => p.removeEventListener(type, handler));
          if (svgContainerRef.current) svgContainerRef.current.innerHTML = "";
        };
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Failed to load SVG: ", err);
          setSidebarText("Failed to load map SVG. Ensure /in.svg is in public/.");
        }
      });

    return () => {
      controller.abort();
      cleanupListeners();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-4">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/3 bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">Origins & Significance</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🌾</div>
              <div>
                <div className="font-medium">Ancient practice</div>
                <div className="text-xs text-gray-600">Passed down generations.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">🪔</div>
              <div>
                <div className="font-medium">Prosperity & ritual</div>
                <div className="text-xs text-gray-600">Linked to welcoming deities.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">🎨</div>
              <div>
                <div className="font-medium">Math-art blend</div>
                <div className="text-xs text-gray-600">Symmetry & recursion in patterns.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">🌍</div>
              <div>
                <div className="font-medium">Eco-friendly</div>
                <div className="text-xs text-gray-600">Made with rice flour/flowers.</div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white rounded border">
            <div className="text-sm font-medium">Selected:</div>
            <div className="mt-2 text-sm text-gray-700 h-28 overflow-auto">
              {selectedState ? (
                <div>
                  <div className="font-semibold">{selectedState}</div>
                  <div className="text-xs text-gray-600">
                    {STATE_INFO[selectedState]?.description || "Regional Kolam info."}
                  </div>
                </div>
              ) : (
                <div>{sidebarText}</div>
              )}
            </div>
          </div>
        </aside>

        {/* Main map */}
        <main className="w-full lg:w-2/3 bg-white p-2 rounded-lg shadow-sm relative">
          <div className="p-2 border-b mb-2 flex items-center justify-between">
            <div className="font-semibold">Interactive India Kolam Map</div>
            <div className="text-sm text-gray-500">Hover a state — click to explore</div>
          </div>
          <div className="w-full h-[520px] flex items-center justify-center">
            {!svgLoaded && <div className="text-gray-400">Loading map…</div>}
            <div
              ref={svgContainerRef}
              className="w-full h-full"
              style={{ display: svgLoaded ? "block" : "none" }}
            />
          </div>


        </main>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && selectedState && (
          <KolamModal
            stateName={selectedState}
            onClose={() => setModalOpen(false)}
            gallery={SOUTH_INDIA_GALLERIES[selectedState] || []}
            info={STATE_INFO[selectedState] || {}}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------- MODAL COMPONENT --------------------
function KolamModal({ stateName, onClose, gallery, info }: any) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % (gallery.length || 1)), 3000);
    return () => clearInterval(t);
  }, [gallery.length]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <motion.div
        className="relative z-10 w-11/12 md:w-3/4 lg:w-2/3 bg-white rounded-2xl shadow-xl overflow-hidden"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Modal content same as before */}
      </motion.div>
    </motion.div>
  );
}
