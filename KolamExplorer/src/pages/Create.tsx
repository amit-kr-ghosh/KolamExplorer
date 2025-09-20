// src/pages/Create.tsx (or src/Create.tsx)
import { Suspense } from "react";
import { KolamEditor } from "../components/KolamEditor"; // adjust path if needed

export default function Create() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fff4cc" }}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-lg">Loading kolam editor...</div>
          </div>
        }
      >
        <KolamEditor />
      </Suspense>

      {/* Explanation Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-amber-800 mb-8">
          How the Kolams Are Created
        </h2>
        <div className="bg-white rounded-2xl shadow-lg p-8 leading-relaxed text-gray-800">
          <p className="mb-4">
            Our Kolam generator is based on <b>mathematical rules</b> and{" "}
            <b>symmetry operations</b>, ensuring both uniqueness and balance.
          </p>

          <h3 className="text-xl font-semibold text-amber-700 mt-6 mb-2">
            1. Dot Grid Setup
          </h3>
          <p className="mb-4">
            Dots are arranged on a 2D grid with spacing <code>s</code>:
          </p>
          <pre className="bg-gray-100 rounded-lg p-3 text-sm overflow-x-auto mb-4">
            {`D = { (i·s, j·s) | i, j ∈ Z }`}
          </pre>

          <h3 className="text-xl font-semibold text-amber-700 mt-6 mb-2">
            2. Base Curve Patterns
          </h3>
          <p className="mb-4">
            Each dot may host one of 16 primitive patterns, defined by control
            points:
          </p>
          <pre className="bg-gray-100 rounded-lg p-3 text-sm overflow-x-auto mb-4">
            {`Pk = { (xm, ym) }m=1…n`}
          </pre>

          <h3 className="text-xl font-semibold text-amber-700 mt-6 mb-2">
            3. Connectivity Rules
          </h3>
          <p className="mb-4">
            Patterns have connection vectors to ensure smooth flow:
          </p>
          <pre className="bg-gray-100 rounded-lg p-3 text-sm overflow-x-auto mb-4">
            {`C(Pk) = (c_down, c_right)`}{"\n"}
            {`Placement allowed if:`}{"\n"}
            {`C(Pi,j) ∩ C(Pi+1,j) ≠ ∅`}
          </pre>

          <h3 className="text-xl font-semibold text-amber-700 mt-6 mb-2">
            4. Symmetry Transformations
          </h3>
          <p className="mb-4">
            The grid is expanded using reflections to preserve balance:
          </p>
          <pre className="bg-gray-100 rounded-lg p-3 text-sm overflow-x-auto mb-4">
            {`(x, y) ↦ (−x, y)   Horizontal`}\n
            {`(x, y) ↦ (x, −y)   Vertical`}
          </pre>

          <h3 className="text-xl font-semibold text-amber-700 mt-6 mb-2">
            5. Final Rendering
          </h3>
          <p className="mb-4">
            Each cell’s curve is mapped into world coordinates:
          </p>
          <pre className="bg-gray-100 rounded-lg p-3 text-sm overflow-x-auto mb-4">
            {`(x, y) ↦ (x + i·s, y + j·s)`}
          </pre>

          <p className="mt-6">
            Because the rules allow variation, <b>each run produces a unique
            Kolam</b>, while still respecting mathematical continuity and
            symmetry.
          </p>``
        </div>
      </section>
    </div>
  );
}
