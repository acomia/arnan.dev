import { profile } from "@/content";

const SURFACES = [
  { label: "Mobile app", detail: "1" },
  { label: "Web", detail: "2" },
  { label: "Kiosk", detail: "3" },
  { label: "Ops console", detail: "4" },
];

/**
 * The mechanism, drawn rather than claimed: four surfaces standing on one
 * shared domain model, set out as a plan with its own dimension string.
 */
export function SurfacePlan() {
  const w = 800;
  const base = 158;
  const left = 34;
  const right = w - 34;
  const slot = (right - left) / SURFACES.length;

  return (
    <figure className="mt-14 lg:mt-16">
      <svg
        viewBox={`0 0 ${w} 210`}
        className="w-full text-line"
        role="img"
        aria-label={`${SURFACES.map((s) => s.label).join(", ")} — four surfaces built on one shared domain model.`}
      >
        <g fill="none" stroke="currentColor" vectorEffect="non-scaling-stroke">
          {/* The shared model: the heaviest line on the drawing. */}
          <line
            data-draw
            x1={left}
            y1={base}
            x2={right}
            y2={base}
            strokeWidth="3"
          />

          {SURFACES.map((s, i) => {
            const x = left + i * slot + slot * 0.12;
            const boxW = slot * 0.76;
            const top = base - 74 + (i % 2) * 10;
            return (
              <g key={s.label}>
                <rect
                  data-draw
                  x={x}
                  y={top}
                  width={boxW}
                  height={base - top}
                  strokeWidth="1.5"
                />
                <line
                  data-draw
                  x1={x + boxW / 2}
                  y1={top}
                  x2={x + boxW / 2}
                  y2={top - 20}
                  strokeWidth="1"
                  className="text-line-soft"
                />
                <circle
                  cx={x + boxW / 2}
                  cy={top - 30}
                  r="10"
                  strokeWidth="1"
                  className="text-line-soft"
                />
              </g>
            );
          })}

          {/* Overall dimension of the set. */}
          <g strokeWidth="1" className="text-line-soft">
            <line data-draw x1={left} y1={base + 28} x2={right} y2={base + 28} />
            <line x1={left} y1={base + 22} x2={left} y2={base + 34} />
            <line x1={right} y1={base + 22} x2={right} y2={base + 34} />
          </g>
        </g>

        <g className="fill-current">
          {SURFACES.map((s, i) => {
            const x = left + i * slot + slot * 0.12;
            const boxW = slot * 0.76;
            const top = base - 74 + (i % 2) * 10;
            return (
              <g key={s.label}>
                <text
                  x={x + boxW / 2}
                  y={top - 26}
                  textAnchor="middle"
                  className="fill-line-soft font-[family-name:var(--font-mono)] text-[11px]"
                >
                  {s.detail}
                </text>
                <text
                  x={x + boxW / 2}
                  y={base - 12}
                  textAnchor="middle"
                  className="lettering fill-line text-[12px]"
                >
                  {s.label}
                </text>
              </g>
            );
          })}
          <text
            x={left}
            y={base + 48}
            className="annotation fill-line-soft text-[11px]"
          >
            One shared domain model
          </text>
          <text
            x={right}
            y={base + 48}
            textAnchor="end"
            className="fill-line-soft font-[family-name:var(--font-mono)] text-[11px]"
          >
            Kabin · Wayfarer Group
          </text>
        </g>
      </svg>
      <figcaption className="annotation mt-4 border-t border-line-hair pt-3">
        Kabin — plan · four surfaces, one model · {profile.location}
      </figcaption>
    </figure>
  );
}
