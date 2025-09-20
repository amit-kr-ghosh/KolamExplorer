import React from "react";
import KolamIndiaMap from "../KolamIndiaMap";

const History: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">History & Culture</h2>
      <p className="text-gray-700 mb-6">
        Explore the regional Kolam traditions of South India through this interactive map.
      </p>

      {/* Fixed container for Kolam map */}
      <div className="w-full h-[80vh] max-h-[800px] rounded-xl shadow-lg bg-gray-100">
        <KolamIndiaMap />
      </div>
    </div>
  );
};

export default History;
