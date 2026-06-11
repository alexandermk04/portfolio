"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { CITY_COORDS, EUROPE_PATH, EUROPE_VIEWBOX, project } from "@/lib/mapData";

export type MapMarker = {
  /** Key into CITY_COORDS (lib/mapData.ts). Unknown ids are skipped. */
  id: string;
  label: string;
  sublabel?: string;
};

type LocationMapProps = {
  markers: MapMarker[];
  ariaLabel: string;
  className?: string;
};

export function LocationMap({ markers, ariaLabel, className }: LocationMapProps) {
  const reduce = useReducedMotion();
  // IntersectionObserver is unreliable for SVG child elements (e.g. Safari),
  // so visibility is tracked on the wrapping div instead.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox={EUROPE_VIEWBOX}
        role="img"
        aria-label={ariaLabel}
        className="h-auto w-full"
      >
        <motion.path
          d={EUROPE_PATH}
          fill="var(--color-bg-soft)"
          stroke="var(--color-border)"
          strokeWidth={2}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8 }}
        />
        {markers.map((marker, i) => {
          const coords = CITY_COORDS[marker.id];
          if (!coords) return null;
          const { x, y } = project(coords.lon, coords.lat);

          return (
            <motion.g
              key={marker.id}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.5, delay: 0.4 + 0.15 * i }}
            >
              {!reduce && (
                <motion.circle
                  cx={x}
                  cy={y}
                  r={7}
                  fill="var(--color-accent)"
                  animate={{ r: [7, 18], opacity: [0.4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.3 * i,
                  }}
                />
              )}
              <circle
                cx={x}
                cy={y}
                r={7}
                fill="var(--color-accent)"
                stroke="var(--color-bg)"
                strokeWidth={2.5}
              />
              <text
                x={x + 14}
                y={y + 2}
                fill="var(--color-fg)"
                fontSize={20}
                fontWeight={600}
                fontFamily="var(--font-sans)"
              >
                {marker.label}
              </text>
              {marker.sublabel && (
                <text
                  x={x + 14}
                  y={y + 22}
                  fill="var(--color-muted)"
                  fontSize={15}
                  fontFamily="var(--font-sans)"
                >
                  {marker.sublabel}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
