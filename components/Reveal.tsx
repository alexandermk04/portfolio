import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Kept for call-site compatibility; scroll-driven reveals ignore time delays. */
  delay?: number;
  y?: number;
};

/**
 * Scroll-into-view reveal driven entirely by CSS (see `.reveal` in globals.css).
 * Renders no client JS and never hides content behind hydration: the element is
 * present and styled at first paint, and only animates where the browser
 * supports scroll-driven animations and the user allows motion.
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <div
      className={className ? `reveal ${className}` : "reveal"}
      style={
        {
          "--enter-y": `${y}px`,
          "--enter-delay": delay ? `${delay}s` : undefined,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
